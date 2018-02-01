function MainCarInfoPanelScript(dependences)
{
    //#region event callback
    function onTimeLimitInput(sender)
    {
        this._mainCar.setValue("timeLimit", Number(sender.text));
    }

    function onSceneObjectSelected(sender, val)
    {
        this.refreshPanel();
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
        this.setMainCarInfo();
    }

    function onPointSelected(sender, point, oriPoint)
    {
        this._changePoint(point, oriPoint);
    }

    //#region same with ObstacleInfoPanel
    // TODO this part is the same as ObstacleInfoPanel
    function onRoutePointButtonClick(routePoint, sender)
    {
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
        routePoint.getOwner().removeRoutePoint(routePoint);
    }

    function onRoutePointListRender(obj, index)
    {
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
        // Only this line is different from ObstacleInfoPanel.js
        var sceneObject = this._user.getSelectedSceneObject();
        var addedRoutePoint = null;
        if (sceneObject.getRoutePointCount() == 0)
        {
            // Put map view center.
            var pose = new Pose();
            // get center pos of map view
            var pos = this._loadedDataManager.mapData.uiToMapPosition(this._mainPanel.mapPanel.getViewCenter());

            pose.vec3.x = pos.x;
            pose.vec3.y = pos.y;

            addedRoutePoint = sceneObject.createRoutePoint(this._loadedDataManager.mapData, pose)
            sceneObject.addRoutePoint(addedRoutePoint);
        }
        else
        {
            var selectedRoutePoint = this._user.getSelectedRoutePoint();
            if (selectedRoutePoint == null)
            {
                // Same as last
                var prevRoutePoint = sceneObject.getRoutePoint(sceneObject.getRoutePointCount() - 1);
                addedRoutePoint = prevRoutePoint.clone();
                sceneObject.addRoutePoint(addedRoutePoint);
            }
            else
            {
                var index = selectedRoutePoint.index;
                addedRoutePoint = selectedRoutePoint.clone();
                sceneObject.addRoutePoint(addedRoutePoint, index + 1);
            }
        }
        this._user.selectRoutePoint(addedRoutePoint);
    }
    //#endregion same with ObstacleInfoPanel

    //#endregion event callback

    this._changePoint = function(point, oriPoint)
    {
        this._markPointButton(this.mainCarStartPointButton, point != null && point.pointType == ObjectPointType.MAIN_CAR_START_POINT);
        this.updateRoutePointItem(oriPoint);
        this.updateRoutePointItem(point);
    }

    this._markPointButton = function (pointButton, mark)
    {
        var markImage = pointButton.getChildByName("selectedMark");
        markImage.visible = mark;
    }

    this.updateRoutePointItem = function(routePoint)
    {
        if (routePoint == null || routePoint.pointType != ObjectPointType.MAIN_CAR_ROUTE_POINT)
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
        this.setMainCarBaseInfo();
        this.setRoutePoints();
    }

    this.setMainCarBaseInfo = function()
    {
        this.timeLimitInput.text = this._mainCar.timeLimit;
    }

    this.setRoutePoints = function()
    {
        var routePoints = this._mainCar.getRoutePoints();
        this.routePointList.array = [];
        for (var i = 0; i < routePoints.length; i++)
        {
            this.addRoutePoint(routePoints[i], i, false);
        }
        this.refreshRoutePointList();
    }

    this.refreshRoutePointList = function()
    {
        this.routePointList.refresh();
    }

    this.addRoutePoint = function(routePoint, refresh = true)
    {
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
        this.routePointList.deleteItem(routePoint.index);
    }
    
    //#region constructor
    MainCarInfoPanelScript.super(this);

    // member variable
    DependencesHelper.setDependences(this, dependences);

    // init ui

    // event
    this._mainCar = this._obstacleManager.getMainCar();
    this.routePointList.renderHandler = new Handler(this, onRoutePointListRender);
    this.addRoutePointButton.on(Event.CLICK, this, onAddRoutePointButtonClick);
    this.mainCarStartPointButton.dataSource = {routePoint: this._mainCar.startPoint};
    this.mainCarStartPointButton.on(Event.CLICK, this, onRoutePointButtonClick, [this._mainCar.startPoint]);
    this._user.registerEvent(UserEvent.SCENE_OBJECT_SELECTED, this, onSceneObjectSelected);
    this._user.registerEvent(UserEvent.ROUTE_POINT_SELECTED, this, onPointSelected);
    this._mainCar.registerEvent(ObstacleEvent.ROUTE_POINT_ADDED, this, onRoutePointAdded);
    this._mainCar.registerEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, onRoutePointRemoved);
    this._mainCar.registerEvent(ObjectEvent.VALUE_CHANGED, this, onMainCarBaseInfoChanged);
    this.timeLimitInput.on(Event.ENTER, this, onTimeLimitInput);
    this.timeLimitInput.on(Event.BLUR, this, onTimeLimitInput);

    this.setMainCarInfo();
    this.refreshPanel();
    this._changePoint(this._user.getSelectedRoutePoint(), null);
    //#endregion constructor
}
Laya.class(MainCarInfoPanelScript, "MainCarInfoPanelScript", MainCarInfoPanelUI);