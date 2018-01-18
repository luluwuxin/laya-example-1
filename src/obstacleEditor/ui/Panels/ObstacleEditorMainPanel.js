function ObstacleEditorMainPanelScript(dependences)
{
    //#region event
    function onDebugPanelOpenKeyDown()
    {
        this.debugPanel.visible = !this.debugPanel.visible;
    }

    //#regionend event

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
}

Laya.class(ObstacleEditorMainPanelScript, "ObstacleEditorMainPanelUI", ObstacleEditorMainPanelUI);