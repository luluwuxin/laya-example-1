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

    _userWantToSaveCaseData()
    {
        this.sendEvent(ObstacleEditorEvent.USER_SAVE_CASE, this.getCaseData());
    }

    createMainUI(container)
    {
        var mainPanel = new ObstacleEditorMainPanelScript(this._dependences);
        container.addChild(mainPanel);
        mainPanel.saveButton.on(Event.CLICK, this, function()
        {
            this._userWantToSaveCaseData();
        });
        mainPanel.closeButton.on(Event.CLICK, this, function()
        {
            var closeFunc = function()
            {
                mainPanel.destroy();
                this.sendEvent(ObstacleEditorEvent.USER_CLOSE_EDITOR);
            };

            if (this._loadedDataManager.hasUnsavedData())
            {
                new AskPopupWindowScript(
                    "You have unsaved data, save it?"
                    , this
                    , function()
                    {
                        this._userWantToSaveCaseData();
                        closeFunc.call(this);
                    }
                    , function ()
                    {
                        closeFunc.call(this);
                    }
                ).popup();
            }
            else
            {
                closeFunc.call(this);
            }
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