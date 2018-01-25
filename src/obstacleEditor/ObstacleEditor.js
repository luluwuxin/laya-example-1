var Event = laya.events.Event;

var ObstacleEditorEvent = 
{
    USER_SAVE_CASE: "user save case",
    USER_CLOSE_EDITOR: "user close editor"
};

class ObstacleEditor extends EventObject
{
    constructor()
    {
        super();
        // Init dependences.
        var keyboardEventsManager = new KeyboardEventsManager();
        var obstacleManager = new ObstacleManager();
        var user = new User(obstacleManager);
        var loadedDataManager = new LoadedDataManager(obstacleManager, user);
        var historyManager = new HistoryManager(obstacleManager, loadedDataManager, user);
        var dependences = {
            user: user,
            obstacleManager: obstacleManager,
            keyboardEventsManager: keyboardEventsManager,
            loadedDataManager: loadedDataManager,
            historyManager: historyManager
        };

        DependencesHelper.setDependences(this, dependences);
    }

    _userWantToSaveCaseData()
    {
        this.sendEvent(ObstacleEditorEvent.USER_SAVE_CASE, this.getCaseDataJsonString());
    }

    createMainUI(container)
    {
        var mainPanel = new ObstacleEditorMainPanelScript(this._dependences);
        container.addChild(mainPanel);
        mainPanel.setSaveCaseCallback(this, function()
        {
            this._userWantToSaveCaseData();
        });
        mainPanel.setCloseCallback(this, function()
        {
            this.sendEvent(ObstacleEditorEvent.USER_CLOSE_EDITOR);
        });
    }

    loadMapDataByMapName(mapName)
    {
        this._loadedDataManager.loadMapDataByMapName(mapName);
    }

    loadCaseData(caseDataString)
    {
        this._loadedDataManager.loadCase(caseDataString);
    }

    getMapDataJsonString()
    {
        return this._loadedDataManager.getMapDataJsonString();
    }

    getCaseDataJsonString()
    {
        return this._loadedDataManager.getCaseDataJsonString();
    }

}