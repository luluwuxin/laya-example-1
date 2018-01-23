var HistoryManager = (function()
{
var maxHistorySteps = 32;

class History
{
    constructor (jsonObj)
    {
        this.jsonObj = jsonObj;
        this.timestamp = Date.now();
    }

    canMerge(history)
    {
        return history.timestamp - this.timestamp < 50;
    }
}

function addHistory()
{
    if (this._historyEnabled == false)
    {
        this._historyDirty = true;
        return;
    }
    var length = this._historyList.length;
    var history = new History(this._obstacleManager.toJson());
    this._historyList.splice(this._currentIndex + 1, length - 1 - this._currentIndex);
    if (this._currentIndex >= 0 && this._historyList[this._currentIndex].canMerge(history))
    {
        this._historyList.splice(this._currentIndex, 1);
        this._currentIndex -= 1;
    }
    this._historyList.push(history);
    this._currentIndex += 1;
}

function useCurrentHistory()
{
    this._loadedDataManager.loadCaseByJsonObject(this._historyList[this._currentIndex].jsonObj);
}

function onObstacleAdded(sender, obstacle)
{
    obstacle.registerEvent(ObjectEvent.VALUE_CHANGED, this, onObstacleInfoChanged);
    obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_ADDED, this, onRoutePointAdded);
    obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, onRoutePointRemoved);
    addHistory.call(this);
}

function onObstacleRemoved(sender, obstacle)
{
    addHistory.call(this);
}

function onObstacleInfoChanged(sender, keys, values)
{
    addHistory.call(this);
}

function onRoutePointAdded(sender, routePoint)
{
    routePoint.registerEvent(ObjectEvent.VALUE_CHANGED, this, onRoutePointInfoChanged);
    addHistory.call(this);
}

function onRoutePointRemoved(sender, routePoint)
{
    addHistory.call(this);
}

function onRoutePointInfoChanged(sender, keys, values)
{
    addHistory.call(this);
}

function onCaseDataStartLoad(sender)
{
    if (this._isDoMode)
    {
        // do nothing
        return;
    }
    this.disableRecordHistory();
}

function onCaseDataLoaded(sender)
{
    if (this._isDoMode)
    {
        // do nothing
        return;
    }
    this.enableRecordHistory();
}

function enterDoMode(val)
{
    this._isDoMode = val;
    if (val)
    {
        this.disableRecordHistory();
    }
    else
    {
        this.enableRecordHistory(false);
    }
}

function saveSelectionInfo()
{
    this._saveInfo = {};
    var obstacle = this._user.getSelectedObstacle();
    this._saveInfo.obstacleIndex = this._obstacleManager.getObstacleIndex(obstacle);
    var routePoint = this._user.getSelectedRoutePoint();
    if (routePoint == null)
    {
        this._saveInfo.routePointIndex = -1;
    }
    else
    {
        this._saveInfo.routePointIndex = routePoint.index;
    }
}

function useSelectionInfo()
{
    var obstacle = null;
    if (this._saveInfo.obstacleIndex != -1)
    {
        obstacle = this._obstacleManager.getObstacle(this._saveInfo.obstacleIndex)
        this._user.selectObstacle(obstacle);
    }
    if (this._saveInfo.routePointIndex != -1 && obstacle != null)
    {
        this._user.selectRoutePoint(obstacle.getRoutePoint(this._saveInfo.routePointIndex));
    }
}

class HistoryManager
{
    constructor(obstacleManager, loadedDataManager, user)
    {
        this._historyList = [];
        this._currentIndex = -1;
        this._historyEnabled = true;
        this._historyDirty = false;
        this._isDoMode = false;
        this._obstacleManager = obstacleManager;
        this._loadedDataManager = loadedDataManager;
        this._user = user;

        // register event
        loadedDataManager.registerEvent(LoadedDataManagerEvent.CASE_DATA_START_LOAD, this, onCaseDataStartLoad);
        loadedDataManager.registerEvent(LoadedDataManagerEvent.CASE_DATA_LOADED, this, onCaseDataLoaded);

        obstacleManager.registerEvent(ObstacleManagerEvent.ADDED, this, onObstacleAdded);
        obstacleManager.registerEvent(ObstacleManagerEvent.REMOVED, this, onObstacleRemoved);
        var obstacles = obstacleManager.getObstacles();
        for (var obstacle of obstacles)
        {
            obstacle.registerEvent(ObjectEvent.VALUE_CHANGED, this, onObstacleInfoChanged);
            obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_ADDED, this, onRoutePointAdded);
            obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, onRoutePointRemoved);
            var routePoints = obstacle.getRoutePoints();
            for (var routePoint of routePoints)
            {
                routePoint.registerEvent(ObjectEvent.VALUE_CHANGED, this, onRoutePointInfoChanged);
            }
        }

        addHistory.call(this);
    }

    disableRecordHistory()
    {
        if (this._historyEnabled == false)
        {
            logError("Logic error, there shall be no action to disable record when it's already disabled.");
            console.trace();
            return;
        }
        this._historyEnabled = false;
        this._historyDirty = false;
    }

    enableRecordHistory(recordNow = true)
    {
        if (this._historyEnabled)
        {
            logError("Logic error, there shall be no action to enable record when it's already enabled.");
            console.trace();
            return;
        }
        this._historyEnabled = true;
        if (recordNow && this._historyDirty)
        {
            addHistory.call(this);
            this._historyDirty = false;
        }
    }

    canUndo()
    {
        return this._currentIndex > 0;
    }

    canRedo()
    {
        return this._currentIndex + 1 < this._historyList.length;
    }

    undo()
    {
        if (this.canUndo() == false)
        {
            return;
        }        
        saveSelectionInfo.call(this);
        enterDoMode.call(this, true);
        this._currentIndex -= 1;
        useCurrentHistory.call(this);
        enterDoMode.call(this, false);
        useSelectionInfo.call(this);
    }

    redo()
    {
        if (this.canRedo() == false)
        {
            return;
        }
        saveSelectionInfo.call(this);
        enterDoMode.call(this, true);
        this._currentIndex += 1;
        useCurrentHistory.call(this);
        enterDoMode.call(this, false);
        useSelectionInfo.call(this);
    }
}
return HistoryManager;
})();