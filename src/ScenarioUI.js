// Class for the Scenario webpage.
//
function ScenarioUI(pages)
{
    ScenarioUI.super(this);

    // Initialize UI elements
    this.initBannerUI();
    this.initScenarioListUI();

    // Pages for switching
    this.pages = pages;
}
Laya.class(ScenarioUI, "ScenarioUI", ScenarioPageUI);

// Init the banner UI.
ScenarioUI.prototype.initBannerUI = function () {
    function choosePage(pages, name) {
        Object.entries(pages).forEach(function (p) {
            p[1].visible = (p[0] === name);
        });
    }

    this.m_uiBanner_home.on(Laya.Event.CLICK, this, function () {
        choosePage(this.pages, "mainUI");
    });
    this.m_uiBanner_setup.on(Laya.Event.CLICK, this, function () {
        choosePage(this.pages, "setupUI");
    });
    this.m_uiBanner_scene.on(Laya.Event.CLICK, this, function () {
        choosePage(this.pages, "drivingUI");
    });
    this.m_uiBanner_scenario.on(Laya.Event.CLICK, this, function () {
        choosePage(this.pages, "scenarioUI");
    });
};

// Init the scenario list UI.
ScenarioUI.prototype.initScenarioListUI = function () {
    // Hide the scrollb bar and use dragging.
    this.m_uiScenarioList.scrollBar.hide = true;
    this.m_uiScenarioList.scrollBar.elasticBackTime = 200;
    this.m_uiScenarioList.scrollBar.elasticDistance = 50;

    this.m_uiScenarioList.on(Laya.Event.CHANGE, this, function () {
        console.log("select scenario " + this.m_uiScenarioList.selectedIndex);
    });

    // Mock data
    this.m_uiScenarioList.array = [
        {
            label: {
                text: "scenario 1",
            },
        },
        {
            label: {
                text: "scenario 2",
            },
        },
    ];


    // Add scenario button.
    this.m_uiScenarioButton.on(Laya.Event.CLICK, this, function() {
        var editor = new ObstacleEditor();
        editor.createMainUI(this);

        // TODO
        // load data
        // editor.loadMapData(url);
        // editor.loadCaseData(url);

        editor.registerEvent(ObstacleEditorEvent.USER_SAVE_CASE, this, function (text)
        {
            // do something when user want to save case data.
            // TODO: send text to server
        });

        editor.registerEvent(ObstacleEditorEvent.USER_CLOSE_EDITOR, this, function ()
        {
            // do something when user close editor.
            // nothing to do
        });
    });
};
