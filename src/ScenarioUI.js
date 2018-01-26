// Class for the Scenario webpage.
//
function ScenarioUI(pageChooser, client)
{
    ScenarioUI.super(this);

    // Initialize UI elements
    this.initBannerUI();
    this.initSelectSceneUI();
    this.initScenarioListUI();
    this.initSensorControlUI();
    this.initDriveControlUI();

    // Pages for switching
    this.pageChooser = pageChooser;

    // Model and WebSocket backend
    this.client = client
      .on("case_list", this, function () {
          this.refreshScenarioListUI();
      })
      .on("ros_info", this, function () {
          this.refreshSensorControlUI();
      })
      .on("car_state", this, function () {
          this.refreshCarStateUI();
      });
}
Laya.class(ScenarioUI, "ScenarioUI", ScenarioPageUI);

// Init the banner UI.
ScenarioUI.prototype.initBannerUI = function () {
    this.m_uiBanner_home.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("mainUI");
    });
    this.m_uiBanner_setup.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("setupUI");
    });
    this.m_uiBanner_scene.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("drivingUI");
    });
    this.m_uiBanner_scenario.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("scenarioUI");
    });
};

ScenarioUI.prototype.initSelectSceneUI = function () {
    this.selectScenePanel.visible = false;
    // TODO: read from server
    this.selectSceneList.array = ["IndustrialCity", "ParkingLot"];
    this.selectSceneList.mouseHandler = new Handler(this, function(event)
    {
        if (event.type != Event.CLICK)
        {
            return;
        }
        // add scenario.
        var sceneName = event.target.dataSource;
        this.client.case.insertDefault(sceneName);
        this.client.storeCases();
        this.refreshScenarioListUI();
        this.selectScenePanel.visible = false;
    });
}


// Init the scenario list UI.
ScenarioUI.prototype.initScenarioListUI = function () {
    this.m_uiScenarioList.array = [];

    this.m_uiScenarioList.renderHandler = new Handler(this, function(obj, index)
    {
        var caseList = this.client.case.getList();
        var label = obj.getChildByName("label");
        var editButton = obj.getChildByName("editButton");
        var removeButton = obj.getChildByName("removeButton");
        var selectedMark = obj.getChildByName("selectedMark");

        var thisCaseId = caseList[index].name;
        var selected = thisCaseId == this.client.case.getSelectedCaseId();
        label.text = caseList[index].name;
        editButton.visible = selected;
        selectedMark.visible = selected;
        removeButton.visible = selected;
        editButton.on(Event.CLICK, this, onEditButtonClick, [thisCaseId]);
        removeButton.on(Event.CLICK, this, onRemoveButtonClick, [thisCaseId]);
    });

    function onRemoveButtonClick (caseId, sender)
    {
        this.pageChooser.sensorChart.hide();
        var dlg = new AskPopupWindowScript(
            "Do you want to delete\n[{0}]?".format(caseId)
            , this
            , function()
            {
                this.client.case.removeCase(caseId);
                this.client.storeCases();
                this.refreshScenarioListUI();

                // reselect item, or the list will select next item but we don't know
                var oriIndex = this.m_uiScenarioList.selectedIndex;
                this.m_uiScenarioList.selectedIndex = -1;
                this.m_uiScenarioList.selectedIndex = oriIndex;
            }
            , function ()
            {
                // do nothing
            }
        );
        dlg.popup();
        dlg.closeHandler = new Laya.Handler(this, function (e) {
            this.pageChooser.sensorChart.show();
        });
    }

    function onEditButtonClick (caseId, sender)
    {
        this.pageChooser.sensorChart.show(false);
        // Open Editor with the content in this.client.case.
        var currentCase = Object.assign({}, this.client.case.getSelectedCase());
        var editor = new ObstacleEditor();
        editor.createMainUI(this);
        editor.registerEvent(ObstacleEditorEvent.USER_SAVE_CASE, this, function (sender, text)
        {
            // do something when user want to save case data.
            currentCase.content = text;
            this.client.case.insert(currentCase);
            this.client.storeCases();
        });

        editor.registerEvent(ObstacleEditorEvent.USER_CLOSE_EDITOR, this, function (sender, text)
        {
            this.pageChooser.sensorChart.show(true);
        });

        editor.loadMapData(currentCase.scene, currentCase.scene_config);
        editor.loadCaseData(currentCase.content);
    }

    function selectCase(caseJson)
    {
        if (caseJson == null)
        {
            this.client.case.selectCase(null);
        }
        else
        {
            this.client.case.selectCase(caseJson.name);
        }
    }

    this.m_uiScenarioList.on(Laya.Event.CHANGE, this, function () {
        var caseList = this.client.case.getList();
        if (this.m_uiScenarioList.selectedIndex == -1)
        {
            selectCase.call(this, null);
        }
        else
        {
            var caseJson = caseList[this.m_uiScenarioList.selectedIndex];
            selectCase.call(this, caseJson);
        }
    });

    // Add scenario button.
    this.m_uiScenarioButton.on(Laya.Event.CLICK, this, function() {
        this.selectScenePanel.visible = true;
    });
};

// Init the Sensor Control UI
ScenarioUI.prototype.initSensorControlUI = function () {
    this.m_uiSensorButton.on(Laya.Event.CLICK, this, function () {
        this.client.startRos();
        this.pageChooser.sensorChart.feedRandomData();
    });

    this.m_uiSensorList.on(Laya.Event.RENDER, this, function (e) {
        var checkbox = e.getChildByName("checkbox");
        var label    = e.getChildByName("label");
        
        checkbox.on(Laya.Event.CLICK, this, function (ee) {
            this.client.ros.ros_info.config.forEach(function (v) {
                if (v.name === label.text) {
                    v.running = checkbox.selected;
                }
            });
        });
    });

    // No data
    this.m_uiSensorList.array = [];
};

// Init the Drive Control UI
ScenarioUI.prototype.initDriveControlUI = function () {
    this.m_uiDriveButton.on(Laya.Event.CLICK, this, function () {
        this.client.startDrive();
    });
};

// Refresh the scenario list UI.
ScenarioUI.prototype.refreshScenarioListUI = function () {
    var data = [];
    this.client.case.getList().forEach(function (v, i) {
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
    if (!this.client.ros.ros_info) {
        this.m_uiSensorList.array = [];
    }

    var data = [];
    this.client.ros.ros_info.config.forEach(function (v) {
        if (v.name === "raw_drive" || v.name === "AirSimDriver") return;
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
    this.m_uiDrive_steerImage.rotation = this.client.car.car_state.steer * 90;
};
