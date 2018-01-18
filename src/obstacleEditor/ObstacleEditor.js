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
        var dependences = {
            user: user,
            obstacleManager: obstacleManager,
            keyboardEventsManager: keyboardEventsManager,
            loadedDataManager: loadedDataManager
        };

        DependencesHelper.setDependences(this, dependences);
    }

    createMainUI(container)
    {
        var mainPanel = new ObstacleEditorMainPanelScript(this._dependences);
        container.addChild(mainPanel);
        mainPanel.saveButton.on(Event.CLICK, this, function()
        {
            this.sendEvent(ObstacleEditorEvent.USER_SAVE_CASE);
        });
        mainPanel.closeButton.on(Event.CLICK, this, function()
        {
            // TODO: if there is unsaved data, ask user if he wants to save it.
            mainPanel.destroy();
            this.sendEvent(ObstacleEditorEvent.USER_CLOSE_EDITOR);
        });
    }

    loadMapData(mapDataDirectory)
    {
        this._loadedDataManager.loadMapData(mapDataDirectory);
    }

    loadCaseData(caseDataFilePath)
    {
        this._loadedDataManager.loadCaseData(caseDataFilePath);
    }

    getCaseData()
    {
        return this._loadedDataManager.getCaseData();
    }
}