function ObstacleEditorMainPanelScript(dependences)
{
    //#region event
    function onDebugPanelOpenKeyDown()
    {
        this.debugPanel.visible = !this.debugPanel.visible;
    }

    function onSaveButtonClick(sender)
    {
        if (this._saveCaseCallback != null)
        {
            this._saveCaseCallback.call(this._saveCaseCaller);
        }
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
    }

    //#regionend event

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

    this.obstaclePanel = new ObstaclePanelScript(dependences);
    this.obstaclePanelContainer.addChild(this.obstaclePanel);

    this.obstacleInfoPanel = new ObstacleInfoPanelScript(dependences);
    this.obstacleInfoPanelContainer.addChild(this.obstacleInfoPanel);

    this.routePointInfoPanel = new RoutePointInfoPanelScript(dependences);
    this.routePointInfoPanelContainer.addChild(this.routePointInfoPanel);

    this.debugPanel = new DebugPanelScript(dependences);
    this.debugPanel.visible = false;
    this.addChild(this.debugPanel);

    this._keyboardEventsManager.registerKeyEvent(Keyboard.D, this, onDebugPanelOpenKeyDown, Keyboard.SHIFT);
    this.saveButton.on(Event.CLICK, this, onSaveButtonClick);
    this.closeButton.on(Event.CLICK, this, onCloseButtonClick);
}

Laya.class(ObstacleEditorMainPanelScript, "ObstacleEditorMainPanelUI", ObstacleEditorMainPanelUI);