function MainCarPanelScript(dependences)
{
    //#region event callback
    function onMainCarClick()
    {
        this._user.selectMainCar(true);
    }

    function onSceneObjectSelected(sender, sceneObject)
    {
        this.markImage.visible = sceneObject.sceneObjectType == SceneObjectType.MAIN_CAR;
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
    this._user.registerEvent(UserEvent.SCENE_OBJECT_SELECTED, this, onSceneObjectSelected);

    this.markImage.visible = false;

    this.refreshMainCarInfo();
    //#endregion constructor
}

Laya.class(MainCarPanelScript, "MainCarPanelScript", MainCarPanelUI);