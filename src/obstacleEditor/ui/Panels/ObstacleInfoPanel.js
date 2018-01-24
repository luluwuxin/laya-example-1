function ObstacleInfoPanelScript(dependences)
{
    //#region event callback
    function onNameInput(sender)
    {
        var obstacle = this._user.getSelectedObstacle();
        obstacle.setName(sender.text);
    }

    function onTypeChanged(sender)
    {
        var comboBox = sender.currentTarget;
        var obstacle = this._user.getSelectedObstacle();

        obstacle.setType(comboBox.selectedLabel);
    }

    function onObstacleSelected(sender, obstacle, oriObstacle)
    {
        this.changeObstacle(obstacle, oriObstacle);
    }

    function onRoutePointAdded(sender, routePoint)
    {
        this.addRoutePoint(routePoint);
    }

    function onRoutePointRemoved(sender, routePoint)
    {
        this.removeRoutePoint(routePoint);
    }

    function onObstacleBaseInfoChanged(sender, obstacle)
    {
        if (obstacle === this._user.getSelectedObstacle())
        {
            this.setObstacleInfo(obstacle);
        }
    }

    function onRoutePointSelected(sender, routePoint, oriRoutePoint)
    {
        this.updateRoutePointItem(oriRoutePoint);
        this.updateRoutePointItem(routePoint);
    }

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
        routePoint.obstacle.removeRoutePoint(routePoint);
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
        var obstacle = this._user.getSelectedObstacle();

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

    function onMapDataLoaded()
    {
        // init typeComboBox
        UIHelper.setComboLabels(this.typeComboBox, this._loadedDataManager.mapData.getObstacleTypes());
    }

    //#endregion event callback

    this.updateRoutePointItem = function(routePoint)
    {
        if (routePoint == null || routePoint.index == -1)
        {
            return;
        }
        this.routePointList.changeItem(routePoint.index, {routePoint: routePoint});
    }

    this.setObstacleInfo = function(obstacle)
    {
        if (obstacle == null)
        {
            this.contentPanel.visible = false;
        }
        else
        {
            this.contentPanel.visible = true;
            this.typeComboBox.selectedLabel = obstacle.type;
            this.nameInput.text = obstacle.name;
            this.setRoutePoints(obstacle.route);
        }
    }

    this.changeObstacle = function(obstacle, oriObstacle)
    {
        if (oriObstacle != null)
        {
            // Unregister original obstacle's point added/removed event.
            oriObstacle.unregisterEvent(ObstacleEvent.ROUTE_POINT_ADDED, this, onRoutePointAdded);
            oriObstacle.unregisterEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, onRoutePointRemoved);
            oriObstacle.unregisterEvent(ObjectEvent.VALUE_CHANGED, this, onObstacleBaseInfoChanged);
        }
        if (obstacle != null)
        {
            // Register new obstacle's point added/removed event.
            obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_ADDED, this, onRoutePointAdded);
            obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, onRoutePointRemoved);
            obstacle.registerEvent(ObjectEvent.VALUE_CHANGED, this, onObstacleBaseInfoChanged);
        }

        this.setObstacleInfo(obstacle);
    }
    this.refreshRoutePointList = function()
    {
        this.routePointList.refresh();
    }
    this.clearRoutePoint = function()
    {
        this.routePointList.array = [];
    }
    this.setRoutePoints = function(route)
    {
        this.routePointList.array = [];
        for (var i = 0; i < route.points.length; i++)
        {
            this.addRoutePoint(route.points[i], i, false);
        }
        this.refreshRoutePointList();
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
    ObstacleInfoPanelScript.super(this);

    // member variable
    DependencesHelper.setDependences(this, dependences);

    // init ui

    // event
    this._loadedDataManager.registerEvent(LoadedDataManagerEvent.MAP_DATA_LOADED, this, onMapDataLoaded);
    this.routePointList.renderHandler = new Handler(this, onRoutePointListRender);
    this.addRoutePointButton.on(Event.CLICK, this, onAddRoutePointButtonClick);
    this.typeComboBox.on(Event.CHANGE, this, onTypeChanged);
    this.nameInput.on(Event.ENTER, this, onNameInput);
    this.nameInput.on(Event.BLUR, this, onNameInput);
    this._user.registerEvent(UserEvent.OBSTACLE_SELECTED, this, onObstacleSelected);
    this._user.registerEvent(UserEvent.ROUTE_POINT_SELECTED, this, onRoutePointSelected);

    this.changeObstacle(this._user.getSelectedObstacle(), null);
    //#endregion constructor
}
Laya.class(ObstacleInfoPanelScript, "ObstacleInfoPanelUI", ObstacleInfoPanelUI);