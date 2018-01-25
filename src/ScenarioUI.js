// Class for the Scenario webpage.
//
function ScenarioUI(pages, client)
{
    ScenarioUI.super(this);

    // Initialize UI elements
    this.initBannerUI();
    this.initScenarioListUI();
    this.initSensorControlUI();
    this.initDriveControlUI();

    // Pages for switching
    this.pages = pages;

    // Model and WebSocket backend
    this.client = client
      .on("case_list", this, function () {
          this.refreshScenarioListUI();
      })
      .on("ros_status", this, function () {
          this.refreshSensorControlUI();
      })
      .on("car_state", this, function () {
          this.refreshCarStateUI();
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
    var selectedCaseId = null;
    this.m_uiScenarioList.array = [];

    this.m_uiScenarioList.renderHandler = new Handler(this, function(obj, index)
    {
        var caseList = this.client.case.case_list.list;
        var label = obj.getChildByName("label");
        var editButton = obj.getChildByName("editButton");
        var selectedMark = obj.getChildByName("selectedMark");

        var thisCaseId = caseList[index].name;
        var selected = thisCaseId == selectedCaseId;
        label.text = caseList[index].name;
        editButton.visible = selected;
        selectedMark.visible = selected;
        editButton.on(Event.CLICK, this, onEditButtonClick, [thisCaseId]);
    });

    function onEditButtonClick (sender, caseId)
    {
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
    }

    function selectCase(caseJson)
    {
        selectedCaseId = caseJson.name;
        // Clone the scenario being edited.
        this.client.case.current = JSON.parse(JSON.stringify(caseJson));
    }

    this.m_uiScenarioList.on(Laya.Event.CHANGE, this, function () {
        var caseList = this.client.case.case_list.list;
        var caseJson = caseList[this.m_uiScenarioList.selectedIndex];
        selectCase.call(this, caseJson);
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

// Init the Sensor Control UI
ScenarioUI.prototype.initSensorControlUI = function () {
    this.m_uiSensorButton.on(Laya.Event.CLICK, this, function () {
        this.client.startRos();
    });

    // No data
    this.m_uiSensorList.array = [];
};

// Init the Drive Control UI
ScenarioUI.prototype.initDriveControlUI = function () {
    this.m_uiDriveButton.on(Laya.Event.CLICK, this, function () {
        this.client.startDrive(this.client.case.current.name);
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

// Refresh the sensor control UI.
ScenarioUI.prototype.refreshSensorControlUI = function () {
    // No data ?
    if (!this.client.ros.ros_status) {
        this.m_uiSensorList.array = [];
    }

    var data = [];
    this.client.ros.ros_status.config.forEach(function (v) {
        data.push({
            checkbox: {
                selected: v.running,
            },
            label: {
                text: v.name,
            },
        });
    });
    this.m_uiSensorList.array = data;
};

// Refresh the car state UI.
ScenarioUI.prototype.refreshCarStateUI = function () {
    // No data ?
    if (!this.client.car.car_state) {
        return;
    }

    this.m_uiDrive_speed.text = this.client.car.car_state.speed.toFixed(3);
    this.m_uiDrive_accer.text = this.client.car.car_state.accer.toFixed(3);
    this.m_uiDrive_steerSlider.value = this.client.car.car_state.steer;
    this.m_uiDrive_steerImage.rotation = this.client.car.car_state.steer * 540;
};
