function DebugPanelScript(dependences)
{
    function onCloseButtonClick()
    {
        this.visible = false;
    }

    function onLoadMapButtonClick()
    {
        if (this.mapDirectoryInput.text == "")
        {
            this.mapDirectoryInput.text = "E:/workspace/TestData/SceneMapData/IndustrialCity";
        }
        this._loadedDataManager.loadMapData(this.mapDirectoryInput.text);
    }

    function onSaveCaseButtonClick()
    {
        this._loadedDataManager.downloadCaseData();
    }

    function onLoadCaseButtonClick()
    {
        if (this.loadCaseInput.text == "")
        {
            this.loadCaseInput.text = "E:/workspace/TestData/SceneMapData/IndustrialCity/cases/case.json";
        }
        this._loadedDataManager.loadCaseData(this.loadCaseInput.text);
    }

    DebugPanelScript.super(this);
    DependencesHelper.setDependences(this, dependences);

    this.closeButton.on(Event.CLICK, this, onCloseButtonClick);
    this.loadMapButton.on(Event.CLICK, this, onLoadMapButtonClick);
    this.saveCaseButton.on(Event.CLICK, this, onSaveCaseButtonClick);
    this.loadCaseButton.on(Event.CLICK, this, onLoadCaseButtonClick);

    // onLoadMapButtonClick.call(this);
    // onLoadCaseButtonClick.call(this);
}
Laya.class(DebugPanelScript, "DebugPanelUI", DebugPanelUI);