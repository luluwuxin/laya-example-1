// Class for the Scenario webpage.
//
function ScenarioUI(pages, client)
{
    ScenarioUI.super(this);

    // Initialize UI elements
    this.initBannerUI();
    this.initScenarioListUI();

    // Pages for switching
    this.pages = pages;

    // Model and WebSocket backend
    this.client = client
      .on("case_list", this, function () {
          this.refreshScenarioListUI();
      });
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
    this.m_uiScenarioList.array = [];

    // Hide the scrollb bar and use dragging.
    this.m_uiScenarioList.scrollBar.hide = true;
    this.m_uiScenarioList.scrollBar.elasticBackTime = 200;
    this.m_uiScenarioList.scrollBar.elasticDistance = 50;

    this.m_uiScenarioList.on(Laya.Event.CHANGE, this, function () {
        // Clone the scenario being edited.
        this.client.case.current = JSON.parse(JSON.stringify(
            this.client.case.case_list.list[this.m_uiScenarioList.selectedIndex]));

        // TODO:
        //   Open Editor with the content in this.client.case.current.
        var editor = new ObstacleEditor();
        editor.createMainUI(this);
        editor.registerEvent(ObstacleEditorEvent.USER_SAVE_CASE, this, function (sender, text)
        {
            // do something when user want to save case data.
            // TODO: send text to server

            // TODO:
            //   Populate this.client.case.current.
            this.client.case.current.content = text;
            var client = this.client;
            this.client.case.case_list.list.forEach(function (v) {
                if (v.name === client.case.current.name) {
                    Object.assign(v, client.case.current);
                }
            });
            this.client.storeCases();
        });

        editor.loadMapDataByMapName(this.client.case.current.scene);
        editor.loadCaseData(this.client.case.current.content);
                
    });

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

            // TODO:
            //   Populate this.client.case.current.
            var client = this.client;
            this.client.case.case_list.list.forEach(function (v) {
                if (v.name === client.case.current.name) {
                    Object.assign(v, client.case.current);
                }
            });
            this.client.storeCases();
        });

        editor.registerEvent(ObstacleEditorEvent.USER_CLOSE_EDITOR, this, function ()
        {
            // do something when user close editor.
            // nothing to do
        });
    });
};

// Refresh the scenario list UI.
ScenarioUI.prototype.refreshScenarioListUI = function () {
    var data = [];
    this.client.case.case_list.list.forEach(function (v, i) {
        data.push({
            label: {
                text: v.name,
            },
        });
    });
    this.m_uiScenarioList.array = data;
};
