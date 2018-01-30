var LoadedDataManagerEvent = 
{
    MAP_DATA_LOADED: "map data loaded",
    CASE_DATA_START_LOAD: "case data start load",
    CASE_DATA_LOADED: "case data loaded",
    DATA_DIRTY_CHANGED: "data dirty changed"
};

class LoadedDataManager extends EventObject 
{
    constructor(obstacleManager, user)
    {
        super();

        // member variable
        this._obstacleManager = obstacleManager;
        this._user = user;

        this._dataDirtyFlag = false;
        this.mapData = null;
        this.caseFilePath = "";

        // event
        this._obstacleManager.registerEvent(ObstacleManagerEvent.ADDED, this, this._onObstacleAdded);
        this._obstacleManager.registerEvent(ObstacleManagerEvent.REMOVED, this, this._onDataChanged);
    }

    _onRoutePointAdded(sender, routePoint)
    {
        this._listenRoutePointChange(routePoint);
        this._onDataChanged();
    }

    _onObstacleAdded(sender, obstacle)
    {
        this._listenObstacleChange(obstacle);
        this._onDataChanged();
    }

    _onDataChanged()
    {
        this.setDataDirty(true);
    }

    _listenObstacleChange(obstacle)
    {
        obstacle.registerEvent(ObjectEvent.VALUE_CHANGED, this, this._onDataChanged);
        obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_ADDED, this, this._onRoutePointAdded);
        obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, this._onDataChanged);
    }

    _listenRoutePointChange(routePoint)
    {
        routePoint.registerEvent(ObjectEvent.VALUE_CHANGED, this, this._onDataChanged);
    }

    loadMapDataByMapName(mapName)
    {
        var mapConfigFilePath = AssetsPath.getMapConfigFilePath(mapName);
        FileHelper.readFile(mapConfigFilePath, this, function(text)
        {
            if (text == "")
            {
                logError("Load map faile. Path: [{0}]".format(mapConfigFilePath));
            }
            else
            {
                this.loadMapData(mapName, text);
                
            }
        });
    }

    loadMapData(mapName, mapDataString)
    {
        var mapDataJson = JSON.parse(mapDataString);
        this.mapData = new MapData(mapDataJson, mapName);
        this.sendEvent(LoadedDataManagerEvent.MAP_DATA_LOADED, this.mapData);
    }

    loadCase(text, isInit = true)
    {
        this.loadCaseByJsonObject(JSON.parse(text), isInit);
    }

    loadCaseByJsonObject(jsonObj, isInit)
    {
        // TODO: load main car info
        this.sendEvent(LoadedDataManagerEvent.CASE_DATA_START_LOAD);
        this._user.clear();
        this._obstacleManager.clear();
        var obstaclesObj = jsonObj["obstacles"];
        var firstObstacle = null;
        var firstRoutePoint = null;
        for (var obstacleObj of obstaclesObj)
        {
            var obstacle = new Obstacle(obstacleObj["type"], obstacleObj["name"]);
            if (firstObstacle == null)
            {
                firstObstacle = obstacle;
            }
            this._obstacleManager.addObstacle(obstacle);
            this._listenObstacleChange(obstacle);
            var moveStatesObj = obstacleObj["moveStates"];
            for (var moveStateObj of moveStatesObj)
            {
                var pose = new Pose(Quat.fromJson(moveStateObj["quat"]), Vec3.fromJson(moveStateObj["tran"]));
                var routePoint = new RoutePoint2D(
                    this.mapData,
                    pose,
                    moveStateObj["is_reversing"],
                    moveStateObj["timestamp_interval"],
                    moveStateObj["speed"],
                    moveStateObj["lock_type"]
                );
                obstacle.addRoutePoint(routePoint);
                this._listenRoutePointChange(routePoint);
                if (obstacle == firstObstacle && firstRoutePoint == null)
                {
                    firstRoutePoint = routePoint;
                }
            }
        }

        if (isInit)
        {
            this.setDataDirty(false);
        }

        this.sendEvent(LoadedDataManagerEvent.CASE_DATA_LOADED);

        if (firstObstacle != null)
        {
            this._user.selectObstacle(firstObstacle);
        }
        if (firstRoutePoint != null)
        {
            this._user.selectRoutePoint(firstRoutePoint);
        }
    }

    downloadCaseData()
    {
        FileHelper.createAndDownloadFile("case.json", this.getCaseDataJsonString());
    }

    getMapDataJsonString()
    {
        return JSON.stringify(this.mapData.mapDataJson);
    }

    getCaseDataJsonString()
    {
        var jsonObj = this._obstacleManager.toJson();
        var str = JSON.stringify(jsonObj);
        return str;
    }

    setDataDirty(value)
    {
        if (this._dataDirtyFlag == value)
        {
            return;
        }
        this._dataDirtyFlag = value;
        this.sendEvent(LoadedDataManagerEvent.DATA_DIRTY_CHANGED, this._dataDirtyFlag);
    }

    onDataSaved()
    {
        this.setDataDirty(false);
    }

    hasUnsavedData()
    {
        return this._dataDirtyFlag;
    }
}