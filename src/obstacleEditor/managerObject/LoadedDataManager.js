var LoadedDataManagerEvent = 
{
    MAP_DATA_LOADED: "map data loaded",
    CASE_DATA_LOADED: "case data loaded"
};

class LoadedDataManager extends EventObject 
{
    constructor(obstacleManager, user)
    {
        super();

        this._obstacleManager = obstacleManager;
        this._user = user;

        this.mapData = null;
        this.mapDataDirectory = "";
        this.caseFilePath = "";
    }

    getMapImagePath (dir)
    {
        return dir + "\\" + "map.png";
    }

    getMapInfoFilePath (dir)
    {
        return dir + "\\" + "mapInfo.json";
    }

    loadMapData(mapDataDirectory)
    {
        var mapImagePath = this.getMapImagePath(mapDataDirectory);
        var mapInfoFilePath = this.getMapInfoFilePath(mapDataDirectory);
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
            var moveStatesObj = obstacleObj["moveStates"];
            var lastTimestampSec = 0;
            for (var moveStateObj of moveStatesObj)
            {
                var pose = new Pose(Quat.fromJson(moveStateObj["quat"]), Vec3.fromJson(moveStateObj["tran"]));
                var currentTimestampSec = moveStateObj["timestamp_sec"];
                var route = new RoutePoint2D(this.mapData, pose, currentTimestampSec - lastTimestampSec, moveStateObj["is_reversing"]);
                lastTimestampSec = currentTimestampSec;
                obstacle.addRoutePoint(route);
                if (obstacle == firstObstacle && firstRoutePoint == null)
                {
                    firstRoutePoint = route;
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

        this.sendEvent(LoadedDataManagerEvent.CASE_DATA_LOADED);
    }

    downloadCaseData()
    {
        FileHelper.createAndDownloadFile("case.json", getCaseData());
    }

    getCaseData()
    {
        var jsonObj = this._obstacleManager.toJson();
        var str = JSON.stringify(jsonObj);
        return str;
    }
}