class ObstacleUIOnMap
{
    constructor(mapPanelScript, obstacle, container)
    {
        DependencesHelper.setDependencesByParent(this, mapPanelScript, "mapPanelScript");

        this._container = container;
        
        var createFullBox = function()
        {
            // xxx: Panel, View's mouseThrough can't work, so use box.
            var box = new laya.ui.Box();
            box.left = 0;
            box.right = 0;
            box.top = 0;
            box.bottom = 0;
            box.mouseThrough = true;
            return box;
        };

        this.obstacleContainer = createFullBox();
        this._container.addChild(this.obstacleContainer);

        this.routePointLinkLineContainer = createFullBox();
        this.obstacleContainer.addChild(this.routePointLinkLineContainer);

        this.routePointContainer = createFullBox();
        this.obstacleContainer.addChild(this.routePointContainer);

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

class MainCarUIOnMap extends ObstacleUIOnMap
{
    constructor(mapPanelScript, mainCar, container)
    {
        super(mapPanelScript, mainCar, container);

        // init start point view.
        var routePointView = new RoutePointViewScript(this, mainCar.startPoint);
        this.routePointContainer.addChild(routePointView);
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
        var routePointLinkLineView = new MainCarRoutePointLinkLineView(this, routePoint, this.routePointLinkLineContainer);
        this.routePointLinkLineViews.splice(index, 0, routePointLinkLineView);
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

    function onObstacleAdded(sender, obstacle, index)
    {
        this._addSceneObject(obstacle);
    }

    function onObstacleRemoved(sender, obstacle, index)
    {
        this._removeSceneObject(obstacle);
    }

    function onRoutePointAdded(sender, routePoint)
    {
        this.addRoutePoint(routePoint);
    }

    function onRoutePointRemoved(sender, routePoint)
    {
        this.removeRoutePoint(routePoint);
    }

    function onSceneObjectSelected(sender, sceneObject, oriSceneObject)
    {
        this.selectSceneObject(sceneObject, oriSceneObject);
    }

    function onMapScrolled()
    {
        this._refreshMiniMapFrame();
    }

    

    function onMiniMapButtonCancel(event)
    {
        this.miniMapButton.off(Event.MOUSE_MOVE, this, onMiniMapButtonMove);
    }

    function onMiniMapButtonMove(event)
    {
        this._miniMapFollowMouse(event);
    }

    function onMiniMapButtonDown(event)
    {
        this.miniMapButton.on(Event.MOUSE_MOVE, this, onMiniMapButtonMove);
        this._miniMapFollowMouse(event);
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
        var sceneObject = this._user.getSelectedSceneObject();
        if (sceneObject == null)
        {
            return;
        }
        var pos = this._mapData.uiToMapPosition({x: this.mapImage.mouseX, y: this.mapImage.mouseY});
        var addedRoutePoint = null;
        var pose = new Pose();
        pose.vec3.x = pos.x;
        pose.vec3.y = pos.y;

        var selectedRoutePoint = this._user.getSelectedRoutePoint();
        if (selectedRoutePoint != null && selectedRoutePoint.pointType == ObjectPointType.MAIN_CAR_START_POINT)
        {
            // It's main car's start point.
            sceneObject.startPoint.setValue("x", pos.x, "y", pos.y, "z", this._mapData.mapInfo.objectZ);
        }
        else
        {
            if (sceneObject.getRoutePointCount() == 0)
            {
                addedRoutePoint = sceneObject.createRoutePoint(this._mapData, pose);
                sceneObject.addRoutePoint(addedRoutePoint);
            }
            else
            {
                if (selectedRoutePoint == null)
                {
                    // Same as last
                    var prevRoutePoint = sceneObject.getRoutePoint(sceneObject.getRoutePointCount() - 1);
                    addedRoutePoint = prevRoutePoint.clone();
                    addedRoutePoint.x = pose.vec3.x;
                    addedRoutePoint.y = pose.vec3.y;
                    sceneObject.addRoutePoint(addedRoutePoint);
                }
                else
                {
                    var index = selectedRoutePoint.index;
                    addedRoutePoint = selectedRoutePoint.clone();
                    addedRoutePoint.x = pose.vec3.x;
                    addedRoutePoint.y = pose.vec3.y;
                    sceneObject.addRoutePoint(addedRoutePoint, index + 1);
                }
            }
            this._user.selectRoutePoint(addedRoutePoint);
        }
    }

    //#endregion event callback

    this._miniMapFollowMouse = function(event)
    {
        var ratio = this.miniMapBox.width / this._mapData.mapInfo.width;
        var x = this.miniMapButton.mouseX / ratio;
        var y = this.miniMapButton.mouseY / ratio;
        this.putPointToMapCenter(x, y);
    }

    this.initEvent = function ()
    {
        this._obstacleManager.registerEvent(ObstacleManagerEvent.ADDED, this, onObstacleAdded);
        this._obstacleManager.registerEvent(ObstacleManagerEvent.REMOVED, this, onObstacleRemoved);
        this._user.registerEvent(UserEvent.SCENE_OBJECT_SELECTED, this, onSceneObjectSelected);
        this.mainContainer.vScrollBar.on(Event.CHANGE, this, onMapScrolled);
        this.mainContainer.hScrollBar.on(Event.CHANGE, this, onMapScrolled);
        this.miniMapButton.on(Event.MOUSE_DOWN, this, onMiniMapButtonDown);
        this.miniMapButton.on(Event.MOUSE_UP, this, onMiniMapButtonCancel);
        this.miniMapButton.on(Event.MOUSE_OUT, this, onMiniMapButtonCancel);
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

        this.miniMapImage.skin = this._mapData.getMapImagePath();
        this.miniMapImageLight.skin = this._mapData.getMapImagePath();
        this._refreshMiniMapFrame();
    }

    this.getViewCenter = function ()
    {
        var uiX = this.mainContainer.hScrollBar.value;
        var uiY = this.mainContainer.vScrollBar.value;
        uiX += this.mainContainer.width / 2;
        uiY += this.mainContainer.height / 2;
        return {x: uiX, y: uiY};
    }

    this.putPointToMapCenter = function (x, y)
    {
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

    this._addSceneObject = function (sceneObject)
    {
        var newUI = null;
        if (sceneObject.sceneObjectType == SceneObjectType.OBSTACLE)
        {
            newUI = new ObstacleUIOnMap(this, sceneObject, this.mapImage);
        }
        else
        {
            newUI = new MainCarUIOnMap(this, sceneObject, this.mapImage);
        }
        this._sceneObjectRouteUIs[sceneObject.getUniqueID()] = newUI;
        sceneObject.registerEvent(ObstacleEvent.ROUTE_POINT_ADDED, this, onRoutePointAdded);
        sceneObject.registerEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, onRoutePointRemoved);
    }

    this._removeSceneObject = function (sceneObject)
    {
        this._sceneObjectRouteUIs[sceneObject.getUniqueID()].destroy();
        delete this._sceneObjectRouteUIs[sceneObject.getUniqueID()];
    }

    this.addRoutePoint = function (routePoint)
    {
        var sceneObject = routePoint.getOwner();
        this._sceneObjectRouteUIs[sceneObject.getUniqueID()].addRoutePoint(routePoint);
    }

    this.removeRoutePoint = function (routePoint)
    {
        var sceneObject = routePoint.getOwner();
        this._sceneObjectRouteUIs[sceneObject.getUniqueID()].removeRoutePoint(routePoint);
    }

    this.selectSceneObject = function (obstacle, oriObstacle)
    {
        if (oriObstacle != null && oriObstacle.getUniqueID() in this._sceneObjectRouteUIs)
        {
            this._sceneObjectRouteUIs[oriObstacle.getUniqueID()].setSelected(false);
        }

        if (obstacle != null && obstacle.getUniqueID() in this._sceneObjectRouteUIs)
        {
            this._sceneObjectRouteUIs[obstacle.getUniqueID()].setSelected(true);
        }
    }

    this.setMapData = function (mapData)
    {
        logInfo("Set map data. map image path = [{0}]".format(mapData.getMapImagePath()));
        this._mapData = mapData;
        this.mapImage.skin = this._mapData.getMapImagePath();
        this.mapImage.height = this._mapData.mapInfo.height;
        this.mapImage.width = this._mapData.mapInfo.width;
        
        this.initObstacleInfo();
        this._initMiniMap();
    }

    this.initObstacleInfo = function()
    {
        var obstacles = this._obstacleManager.getObstacles();
        for (var i = 0; i < obstacles.length; i++)
        {
            this._addSceneObject(obstacles[i]);
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
    this._sceneObjectRouteUIs = {};

    // event
    this._loadedDataManager.registerEvent(LoadedDataManagerEvent.MAP_DATA_LOADED, this, onMapDataLoaded);

    ObjectHelper.swallowScrollMouseDown(this.mainContainer.hScrollBar);
    ObjectHelper.swallowScrollMouseDown(this.mainContainer.vScrollBar);
    
    this._addSceneObject(this._obstacleManager.getMainCar());
}
Laya.class(MapPanelScript, "MapPanelScript", MapPanelUI);