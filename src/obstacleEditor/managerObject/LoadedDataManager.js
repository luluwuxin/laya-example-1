var LoadedDataManagerEvent = 
{
    MAP_DATA_LOADED: "map data loaded",
    CASE_DATA_START_LOAD: "case data start load",
    CASE_DATA_LOADED: "case data loaded"
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
        this.mapDataDirectory = "";
        this.caseFilePath = "";

        // event
        this._obstacleManager.registerEvent(ObstacleManagerEvent.ADDED, this, this._onDataChanged);
        this._obstacleManager.registerEvent(ObstacleManagerEvent.REMOVED, this, this._onDataChanged);
    }

    _onDataChanged()
    {
        this._dataDirtyFlag = true;
    }

    _listenObstacleChange(obstacle)
    {
        obstacle.registerEvent(ObjectEvent.VALUE_CHANGED, this, this._onDataChanged);
        obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_ADDED, this, this._onDataChanged);
        obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, this._onDataChanged);
    }

    _listenRoutePointChange(routePoint)
    {
        routePoint.registerEvent(ObjectEvent.VALUE_CHANGED, this, this._onDataChanged);
    }

    _getMapImagePath (dir)
    {
        return dir + "\\" + "map.png";
    }

    _getMapInfoFilePath (dir)
    {
        return dir + "\\" + "mapInfo.json";
    }

    loadMapData(mapDataDirectory)
    {
        var mapImagePath = this._getMapImagePath(mapDataDirectory);
        var mapInfoFilePath = this._getMapInfoFilePath(mapDataDirectory);
        FileHelper.readFile(mapInfoFilePath, this, function(text)
        {
            if (text == "")
            {
                logError("Load map faile. Path: [{0}]".format(mapDataDirectory));
            }
            else
            {
                this.mapDataDirectory = mapDataDirectory;
                var mapInfo = JSON.parse(text);
                this.mapData = new MapData(mapInfo, mapImagePath);
                this.sendEvent(LoadedDataManagerEvent.MAP_DATA_LOADED, this.mapData);
            }
        });
    }

    loadCaseData(caseFilePath)
    {
        FileHelper.readFile(caseFilePath, this, function(text)
        {
            if (text == "")
            {
                logError("Load case faile. Path: [{0}]".format(caseFilePath));
            }
            else
            {
                this.loadCaseByJsonObject(JSON.parse(text));
            }
        });
    }

    loadCaseByJsonObject(jsonObj)
    {
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
        if (firstObstacle != null)
        {
            this._user.selectObstacle(firstObstacle);
        }
        if (firstRoutePoint != null)
        {
            this._user.selectRoutePoint(firstRoutePoint);
        }

        this._dataDirtyFlag = false;
        this.sendEvent(LoadedDataManagerEvent.CASE_DATA_LOADED);
    }

    downloadCaseData()
    {
        FileHelper.createAndDownloadFile("case.json", this.getCaseData());
    }

    getCaseData()
    {
        var jsonObj = this._obstacleManager.toJson();
        var str = JSON.stringify(jsonObj);
        return str;
    }

    hasUnsavedData()
    {
        return this._dataDirtyFlag;
    }
}