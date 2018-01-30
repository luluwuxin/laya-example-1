function MainCarPanelScript(dependences)
{
    //#region event callback
    function onMainCarClick()
    {
        this._user.selectMainCar(true);
    }

    function onMainCarSelected(sender, val)
    {
        this.markImage.visible = val;
    }

    //#endregion event callback

    this.refreshMainCarInfo = function()
    {
        // TODO
    }

    //#region constructor
    MainCarPanelScript.super(this);

    // member variable
    DependencesHelper.setDependences(this, dependences);

    // event
    this.mainCarImage.on(Event.CLICK, this, onMainCarClick);
    this._user.registerEvent(UserEvent.MAIN_CAR_SELECTED, this, onMainCarSelected);

    this.markImage.visible = false;

    this.refreshMainCarInfo();
    //#endregion constructor
}

Laya.class(MainCarPanelScript, "MainCarPanelScript", MainCarPanelUI);