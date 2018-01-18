class ObstacleUIOnMap
{
    constructor(mapPanelScript, obstacle, container)
    {
        DependencesHelper.setDependencesByParent(this, mapPanelScript, "mapPanelScript");

        this._container = container;
        
        var createFullBox = function()
        {
            var box = new laya.ui.Box();
            box.left = 0;
            box.right = 0;
            box.top = 0;
            box.bottom = 0;
            box.mouseThrough = true;
            return box;
        };

        // xxx: Panel, View's mouseThrough can't work, so use box.
        this.obstacleContainer = createFullBox();
        this._container.addChild(this.obstacleContainer);

        this.routePointContainer = createFullBox();
        this.obstacleContainer.addChild(this.routePointContainer);

        this.routePointLinkLineContainer = createFullBox();
        this.obstacleContainer.addChild(this.routePointLinkLineContainer);

        this.routePointViews = [];
        this.routePointLinkLineViews = [];

        this.highlight(false);
    }

    destroy()
    {
        this.obstacleContainer.destroy();
        this.obstacleContainer = null;
    }

    setSelected(value)
    {
        this.highlight(value);
        if (value)
        {
            // Make it highest, not covered by others.
            this._container.setChildIndex(this.obstacleContainer, this._container.numChildren - 1);
        }
    }

    highlight(value)
    {
        if (value)
        {
            this.obstacleContainer.alpha = 1;
        }
        else
        {
            this.obstacleContainer.alpha = 0.3;
        }
    }

    addRoutePoint(routePoint)
    {
        var index = routePoint.index;
        // point view
        var routePointView = new RoutePointViewScript(this, routePoint);

        this.routePointContainer.addChild(routePointView);
        this.routePointViews.splice(index, 0, routePointView);
        routePointView.update();

        // link line view
        // This class is not added to container, but create a sprite and add it to the container.
        // The sprite will be destroyed when invoke routePointLinkLineView.destroy().
        var routePointLinkLineView = new RoutePointLinkLineView(this, routePoint, this.routePointLinkLineContainer);
        this.routePointLinkLineViews.splice(index, 0, routePointLinkLineView);
    }

    removeRoutePoint(routePoint)
    {
        var index = routePoint.index;
        // route point
        this.routePointViews[index].destroy();
        this.routePointViews.splice(index, 1);

        // link line
        this.routePointLinkLineViews[index].destroy();
        this.routePointLinkLineViews.splice(index, 1);
    }
}

function MapPanelScript(dependences)
{
    //#region event callback
    function onMapDataLoaded(sender, mapData)
    {
        this.setMapData(mapData);
        this.initEvent();
    }

    function onCaseDataLoaded(sender)
    {
        var routePoint = this._user.getSelectedRoutePoint();
        if (routePoint != null)
        {
            this.putRoutePointToMapCenter(routePoint);
        }
    }

    function onMapImageLoaded()
    {
        this._mapImageIsLoading = false;
        
        if (this._dataWhenMapImageLoading.pointPutToMapCenter != null)
        {
            var point = this._dataWhenMapImageLoading.pointPutToMapCenter;
            this.putPointToMapCenter(point.x, point.y);
        }

        this._dataWhenMapImageLoading = {};   
    }

    function onObstacleAdded(sender, obstacle, index)
    {
        this.addObstacle(obstacle, index);
    }

    function onObstacleRemoved(sender, obstacle, index)
    {
        this.removeObstacle(obstacle, index);
    }

    function onRoutePointAdded(sender, routePoint)
    {
        this.addRoutePoint(routePoint);
    }

    function onRoutePointRemoved(sender, routePoint)
    {
        this.removeRoutePoint(routePoint);
    }

    function onObstacleSelected(sender, obstacle, oriObstacle)
    {
        this.selectObstacle(obstacle, oriObstacle);
    }

    function onMapScrolled()
    {
        this._refreshMiniMapFrame();
    }

    function onMiniMapButtonClick(event)
    {
        var ratio = this.miniMapBox.width / this._mapData.mapInfo.width;
        var x = this.miniMapButton.mouseX / ratio;
        var y = this.miniMapButton.mouseY / ratio;
        this.putPointToMapCenter(x, y);
    }

    function onMainContainerMouseDown()
    {
        this._isMainContainerClick = true;
        this.mainContainer.on(Event.MOUSE_MOVE, this, onMainContainerMouseMove);
        this.mainContainer.on(Event.MOUSE_OUT, this, onMainContainerMouseMove);
    }
    function onMainContainerMouseUp()
    {
        if (this._isMainContainerClick)
        {
            onMainContainerClick.call(this);
        }
    }
    function onMainContainerMouseMove()
    {
        this._isMainContainerClick = false;
        this.mainContainer.off(Event.MOUSE_MOVE, this, onMainContainerMouseMove);
        this.mainContainer.off(Event.MOUSE_OUT, this, onMainContainerMouseMove);
    }
    function onMainContainerClick()
    {
        var obstacle = this._user.getSelectedObstacle();
        if (obstacle == null)
        {
            return;
        }
        var pos = this._mapData.uiToMapPosition({x: this.mapImage.mouseX, y: this.mapImage.mouseY});
        var addedRoutePoint = null;
        var pose = new Pose();
        pose.vec3.x = pos.x;
        pose.vec3.y = pos.y;
        if (obstacle.getRoutePointCount() == 0)
        {
            addedRoutePoint = new RoutePoint2D(this._mapData, pose);
            obstacle.addRoutePoint(addedRoutePoint);
        }
        else
        {
            var selectedRoutePoint = this._user.getSelectedRoutePoint();
            if (selectedRoutePoint == null)
            {
                // Same as last
                var prevRoutePoint = obstacle.getRoutePoint(obstacle.getRoutePointCount() - 1);
                addedRoutePoint = new RoutePoint2D(this._mapData, pose);
                addedRoutePoint.rotation = prevRoutePoint.rotation;
                obstacle.addRoutePoint(addedRoutePoint);
            }
            else
            {
                var index = selectedRoutePoint.index;
                addedRoutePoint = new RoutePoint2D(this._mapData, pose);
                addedRoutePoint.rotation = selectedRoutePoint.rotation;
                obstacle.addRoutePoint(addedRoutePoint, index + 1);
            }
        }
        this._user.selectRoutePoint(addedRoutePoint);
    }

    //#endregion event callback

    this.initEvent = function ()
    {
        this._obstacleManager.registerEvent(ObstacleManagerEvent.ADDED, this, onObstacleAdded);
        this._obstacleManager.registerEvent(ObstacleManagerEvent.REMOVED, this, onObstacleRemoved);
        this._user.registerEvent(UserEvent.OBSTACLE_SELECTED, this, onObstacleSelected);
        this.mainContainer.vScrollBar.on(Event.CHANGE, this, onMapScrolled);
        this.mainContainer.hScrollBar.on(Event.CHANGE, this, onMapScrolled);
        this.miniMapButton.on(Event.CLICK, this, onMiniMapButtonClick);
        this.mainContainer.on(Event.MOUSE_DOWN, this, onMainContainerMouseDown);
        this.mainContainer.on(Event.MOUSE_UP, this, onMainContainerMouseUp);
    }

    this._refreshMiniMapFrame = function ()
    {
        var targetX = this.mainContainer.hScrollBar.value;
        var targetY = this.mainContainer.vScrollBar.value;
        var ratio = this.miniMapBox.width / this._mapData.mapInfo.width;
        this.actualFrame.width = this.mainContainer.width * ratio;
        this.actualFrame.height = this.mainContainer.height * ratio;
        this.actualFrame.x = targetX * ratio;
        this.actualFrame.y = targetY * ratio;
    }

    this._initMiniMap = function ()
    {
        var targetWidth = 300;
        var targetHeight = 200;
        var mapInfo = this._mapData.mapInfo;
        if (targetWidth / targetHeight < mapInfo.width / mapInfo.height)
        {
            targetHeight = mapInfo.height / mapInfo.width * targetWidth;
        }
        else
        {
            targetWidth = mapInfo.width / mapInfo.height * targetHeight;
        }
        this.miniMapBox.width = targetWidth;
        this.miniMapBox.height = targetHeight;

        this.miniMapImage.skin = this._mapData.mapImagePath;
        this.miniMapImageLight.skin = this._mapData.mapImagePath;
        this._refreshMiniMapFrame();
    }

    this.putPointToMapCenter = function (x, y)
    {
        if (this._mapImageIsLoading)
        {
            this._dataWhenMapImageLoading.pointPutToMapCenter = {x: x, y: y};
            return;
        }
        x = Math.max(0, x - this.mainContainer.width / 2);
        y = Math.max(0, y - this.mainContainer.height / 2);

        x = Math.min(x, this._mapData.mapInfo.width - this.mainContainer.width);
        y = Math.min(y, this._mapData.mapInfo.height - this.mainContainer.height);

        this.mainContainer.scrollTo(x, y);
    }

    this.putRoutePointToMapCenter = function(routePoint)
    {
        var uiPos = this._mapData.mapToUIPosition(routePoint);
        this.putPointToMapCenter(uiPos.x, uiPos.y);
    }

    this.addObstacle = function (obstacle, index)
    {
        this._obstacleRouteUIs[obstacle.getUniqueID()] = new ObstacleUIOnMap(this, obstacle, this.mapImage);
        obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_ADDED, this, onRoutePointAdded);
        obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, onRoutePointRemoved);
    }

    this.removeObstacle = function (obstacle, index)
    {
        this._obstacleRouteUIs[obstacle.getUniqueID()].destroy();
        delete this._obstacleRouteUIs[obstacle.getUniqueID()];
    }

    this.addRoutePoint = function (routePoint)
    {
        var obstacle = routePoint.obstacle;
        this._obstacleRouteUIs[obstacle.getUniqueID()].addRoutePoint(routePoint);
    }

    this.removeRoutePoint = function (routePoint)
    {
        var obstacle = routePoint.obstacle;
        this._obstacleRouteUIs[obstacle.getUniqueID()].removeRoutePoint(routePoint);
    }

    this.selectObstacle = function (obstacle, oriObstacle)
    {
        if (oriObstacle != null && oriObstacle.getUniqueID() in this._obstacleRouteUIs)
        {
            this._obstacleRouteUIs[oriObstacle.getUniqueID()].setSelected(false);
        }

        if (obstacle != null && obstacle.getUniqueID() in this._obstacleRouteUIs)
        {
            this._obstacleRouteUIs[obstacle.getUniqueID()].setSelected(true);
        }
    }

    this.setMapData = function (mapData)
    {
        logInfo("Set map data. map image path = [{0}]".format(mapData.mapImagePath));
        this._mapData = mapData;
        this.mapImage.skin = this._mapData.mapImagePath;
        this.mapImage.height = this._mapData.mapInfo.height;
        this.mapImage.width = this._mapData.mapInfo.width;
        this._mapImageIsLoading = true;
        this._dataWhenMapImageLoading = {};
        
        this.initObstacleInfo();
        this._initMiniMap();
    }

    this.initObstacleInfo = function()
    {
        var obstacles = this._obstacleManager.getObstacles();
        for (var i = 0; i < obstacles.length; i++)
        {
            this.addObstacle(obstacles[i]);
            var routePoints = obstacles[i].getRoutePoints();
            for (var j = 0; j < routePoints.length; j++)
            {
                this.addRoutePoint(routePoints[j]);
            }
        }
    }

    MapPanelScript.super(this);
    DependencesHelper.setDependences(this, dependences);

    // member variable
    this._obstacleRouteUIs = {};
    this._mapImageIsLoading = false;
    this._dataWhenMapImageLoading = {};

    // event
    this._loadedDataManager.registerEvent(LoadedDataManagerEvent.MAP_DATA_LOADED, this, onMapDataLoaded);
    this._loadedDataManager.registerEvent(LoadedDataManagerEvent.CASE_DATA_LOADED, this, onCaseDataLoaded);
    this.mapImage.on(Event.LOADED, this, onMapImageLoaded);
    // do nothing, because map data hasn't been loaded.
}
Laya.class(MapPanelScript, "MapPanelUI", MapPanelUI);