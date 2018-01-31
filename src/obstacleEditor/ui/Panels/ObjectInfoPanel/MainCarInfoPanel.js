function MainCarInfoPanelScript(dependences)
{
    //#region event callback
    function onMainCarSelected(sender, val)
    {
        this.refreshPanel();
    }

    function onMainCarRoutePointSelected(sender, point)
    {
        
    }

    function onMainCarSEPointSelected(sender, point)
    {
        
    }

    function onRoutePointAdded(sender, routePoint)
    {
        this.addRoutePoint(routePoint);
    }

    function onRoutePointRemoved(sender, routePoint)
    {
        this.removeRoutePoint(routePoint);
    }

    function onMainCarBaseInfoChanged(sender)
    {

    }

    function onRoutePointSelected(sender, routePoint, oriRoutePoint)
    {
        // TODO
        this.updateRoutePointItem(oriRoutePoint);
        this.updateRoutePointItem(routePoint);
    }

    function onRoutePointButtonClick(routePoint, sender)
    {
        // TODO
        if (this._user.getSelectedRoutePoint() == routePoint)
        {
            this._mainPanel.mapPanel.putRoutePointToMapCenter(routePoint);
        }
        else
        {
            this._user.selectRoutePoint(routePoint);
        }
    }

    function onRoutePointRemoveButtonClick(routePoint, sender)
    {
        // TODO
        routePoint.obstacle.removeRoutePoint(routePoint);
    }

    function onRoutePointListRender(obj, index)
    {
        // TODO
        obj.label = "point" + index;

        var routePoint = obj.dataSource.routePoint;
        var isSelected = routePoint === this._user.getSelectedRoutePoint();
        var selectedMark = obj.getChildByName("selectedMark");
        if (selectedMark != null)
        {
            selectedMark.visible = isSelected;
        }
        obj.on(Event.CLICK, this, onRoutePointButtonClick, [routePoint]);
        obj.on(Event.RIGHT_CLICK, this, onRoutePointRemoveButtonClick, [routePoint]);
    }

    function onAddRoutePointButtonClick(sender)
    {
        // TODO
        var obstacle = this._user.getSelectedObstacle();
        // TODO: main car selected
        var addedRoutePoint = null;
        if (obstacle.getRoutePointCount() == 0)
        {
            // Put map view center.
            var pose = new Pose();
            // get center pos of map view
            var uiX = this._mainPanel.mapPanel.mainContainer.hScrollBar.value;
            var uiY = this._mainPanel.mapPanel.mainContainer.vScrollBar.value;
            uiX += this._mainPanel.mapPanel.mainContainer.width / 2;
            uiY += this._mainPanel.mapPanel.mainContainer.height / 2;
            var pos = this._loadedDataManager.mapData.uiToMapPosition({x: uiX, y: uiY});

            pose.vec3.x = pos.x;
            pose.vec3.y = pos.y;

            addedRoutePoint = new RoutePoint2D(this._loadedDataManager.mapData, pose)
            obstacle.addRoutePoint(addedRoutePoint);
        }
        else
        {
            var selectedRoutePoint = this._user.getSelectedRoutePoint();
            if (selectedRoutePoint == null)
            {
                // Same as last
                var prevRoutePoint = obstacle.getRoutePoint(obstacle.getRoutePointCount() - 1);
                addedRoutePoint = prevRoutePoint.clone();
                obstacle.addRoutePoint(addedRoutePoint);
            }
            else
            {
                var index = selectedRoutePoint.index;
                addedRoutePoint = selectedRoutePoint.clone();
                obstacle.addRoutePoint(addedRoutePoint, index + 1);
            }
        }
        this._user.selectRoutePoint(addedRoutePoint);
    }

    //#endregion event callback

    this.updateRoutePointItem = function(routePoint)
    {
        // TODO
        if (routePoint == null || routePoint.index == -1)
        {
            return;
        }
        this.routePointList.changeItem(routePoint.index, {routePoint: routePoint});
    }

    this.refreshPanel = function()
    {
        var isMainCarSelected = this._user.isMainCarSelected();
        this.visible = isMainCarSelected;
    }

    this.setMainCarInfo = function()
    {
        var mainCar = this._obstacleManager.getMainCar();
        this.timeLimitInput.text = mainCar.timeLimit;
        var selectedPoint = this._user.getSelectedRoutePoint();
        // TODO
    }

    this.refreshRoutePointList = function()
    {
        this.routePointList.refresh();
    }

    this.setRoutePoints = function(route)
    {
        // TODO
        this.routePointList.array = [];
        for (var i = 0; i < route.points.length; i++)
        {
            this.addRoutePoint(route.points[i], i, false);
        }
        this.refreshRoutePointList();
    }
    this.addRoutePoint = function(routePoint, refresh = true)
    {
        // TODO
        var index = routePoint.index;
        if (refresh)
        {
            this.routePointList.addItemAt({routePoint: routePoint}, index);
        }
        else
        {
            this.routePointList.array.splice(index, 0, {routePoint: routePoint});
        }
    }
    this.removeRoutePoint = function(routePoint)
    {
        // TODO
        this.routePointList.deleteItem(routePoint.index);
    }
    
    //#region constructor
    MainCarInfoPanelScript.super(this);

    // member variable
    DependencesHelper.setDependences(this, dependences);

    // init ui

    // event
    this.routePointList.renderHandler = new Handler(this, onRoutePointListRender);
    this.addRoutePointButton.on(Event.CLICK, this, onAddRoutePointButtonClick);
    this._user.registerEvent(UserEvent.MAIN_CAR_SELECTED, this, onMainCarSelected);
    this._user.registerEvent(UserEvent.MAIN_CAR_ROUTE_POINT_SELECTED, this, onMainCarRoutePointSelected);
    this._user.registerEvent(UserEvent.MAIN_CAR_SE_POINT_SELECTED, this, onMainCarSEPointSelected);

    this.setMainCarInfo();
    this.refreshPanel();
    //#endregion constructor
}
Laya.class(MainCarInfoPanelScript, "MainCarInfoPanelScript", MainCarInfoPanelUI);