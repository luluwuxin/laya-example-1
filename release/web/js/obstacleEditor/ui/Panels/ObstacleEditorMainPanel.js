function ObstacleEditorMainPanelScript(dependences)
{
    //#region event
    function onDebugPanelOpenKeyDown()
    {
        this.debugPanel.visible = !this.debugPanel.visible;
    }

    function onCaseDataDirtyChanged (sender, dirtyFlag)
    {
        if (dirtyFlag)
        {
            this.saveButton.label = "Save*";
        }
        else
        {
            this.saveButton.label = "Save";
        }
    }

    function onUndoButtonClick()
    {
        this._historyManager.undo();
    }

    function onRedoButtonClick()
    {
        this._historyManager.redo();
    }

    function onSaveButtonClick(sender)
    {
        this._saveCase();
    }

    function onCloseButtonClick(sender)
    {
        var closeFunc = function()
        {
            if (this._closeCallback != null)
            {
                this._closeCallback.call(this._closeCaseCaller);
            }
            this.destroy();
        };

        if (this._loadedDataManager.hasUnsavedData())
        {
            new AskPopupWindowScript(
                "You have unsaved data, save it?"
                , this
                , function()
                {
                    this._saveCase();
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
    }

    //#regionend event

    this._saveCase = function ()
    {
        if (this._saveCaseCallback != null)
        {
            this._saveCaseCallback.call(this._saveCaseCaller);
            this._loadedDataManager.onDataSaved();
        }
    }

    this.setSaveCaseCallback = function (caller, saveCaseCallback)
    {
        this._saveCaseCaller = caller;
        this._saveCaseCallback = saveCaseCallback;
    }

    this.setCloseCallback = function (caller, closeCallback)
    {
        this._closeCaseCaller = caller;
        this._closeCallback = closeCallback;
    }

    ObstacleEditorMainPanelScript.super(this);

    DependencesHelper.setDependences(this, dependences);

    dependences.mainPanel = this;

    this.mapPanel = new MapPanelScript(dependences);
    this.mapPanelContainer.addChild(this.mapPanel);

    this.mainCarPanel = new MainCarPanelScript(dependences);
    this.mainCarPanelContainer.addChild(this.mainCarPanel);

    this.obstaclePanel = new ObstaclePanelScript(dependences);
    this.obstaclePanelContainer.addChild(this.obstaclePanel);

    this.obstacleInfoPanel = new ObstacleInfoPanelScript(dependences);
    this.objectInfoPanelContainer.addChild(this.obstacleInfoPanel);

    this.mainCarInfoPanel = new MainCarInfoPanelScript(dependences);
    this.objectInfoPanelContainer.addChild(this.mainCarInfoPanel);

    this.routePointInfoPanel = new RoutePointInfoPanelScript(dependences);
    this.routePointInfoPanelContainer.addChild(this.routePointInfoPanel);

    this.debugPanel = new DebugPanelScript(dependences);
    this.debugPanel.visible = false;
    this.addChild(this.debugPanel);

    this._keyboardEventsManager.registerKeyEvent(Keyboard.D, this, onDebugPanelOpenKeyDown, Keyboard.SHIFT);
    this._loadedDataManager.registerEvent(LoadedDataManagerEvent.DATA_DIRTY_CHANGED, this, onCaseDataDirtyChanged);
    this.saveButton.on(Event.CLICK, this, onSaveButtonClick);
    this.closeButton.on(Event.CLICK, this, onCloseButtonClick);
    this.undoButton.on(Event.CLICK, this, onUndoButtonClick);
    this.redoButton.on(Event.CLICK, this, onRedoButtonClick);
}

Laya.class(ObstacleEditorMainPanelScript, "ObstacleEditorMainPanelScript", ObstacleEditorMainPanelUI);