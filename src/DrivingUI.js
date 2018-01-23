// Class for the Open Scene Driving webpage.
//
function DrivingUI(pages, client)
{
    DrivingUI.super(this);

    // Initialize UI elements
    this.initBannerUI();
    this.initSceneListUI();
    this.initSettingTabUI();
    this.initPathUI();
    this.initWeatherUI();
    this.initTrafficUI();
    this.initSensorControlUI();

    // Pages for switching
    this.pages = pages;

    // Model and WebSocket backend
    this.client = client
      .on("__init_scene_list", this, function () {
          this.refreshPathUI();
          this.refreshWeatherUI();
          this.refreshTrafficUI();
          this.refreshSceneListUI();
          this.refreshCarStateUI();
      })
      .on("scene_info", this, function () {
          this.refreshPathUI();
      })
      .on("weather_info", this, function () {
          this.refreshWeatherUI();
      })
      .on("traffic_info", this, function () {
          this.refreshTrafficUI();
      })
      .on("ros_status", this, function () {
          this.refreshSensorControlUI();
      })
      .on("car_state", this, function () {
          this.refreshCarStateUI();
      });
}
Laya.class(DrivingUI, "DrivingUI", DrivingPageUI);

// Init the banner UI.
DrivingUI.prototype.initBannerUI = function () {
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

// Init the scene list UI.
DrivingUI.prototype.initSceneListUI = function () {
    // Hide the scrollb bar and use dragging.
    this.m_uiSceneList.scrollBar.hide = true;
    this.m_uiSceneList.scrollBar.elasticBackTime = 200;
    this.m_uiSceneList.scrollBar.elasticDistance = 50;

    // Mouse events.
    this.m_uiSceneList.mouseHandler = new Handler(this, function (e, i) {
        if (e.type === Laya.Event.CLICK) {
            this.client.chooseScene(i);
        }
    });
};

// Init the setting tab UI.
DrivingUI.prototype.initSettingTabUI = function () {
    this.m_uiSettingTab.on(Laya.Event.CHANGE, this, function () {
        // Available tabs
        var tabs = [
            this.m_uiPath,
            this.m_uiWeather,
            this.m_uiTraffic,
        ];

        // Index of the tab being shown
        var showing = this.m_uiSettingTab.selectedIndex;

        // Show or hide the selected tab
        tabs.forEach(function (v, i) {
            v.visible = (i === showing);
        });
    });
};

// Init the path UI.
DrivingUI.prototype.initPathUI = function () {
    // Hide the scrollb bar and use dragging.
    this.m_uiPathList.scrollBar.hide = true;
    this.m_uiPathList.scrollBar.elasticBackTime = 200;
    this.m_uiPathList.scrollBar.elasticDistance = 50;

    // Mouse events.
    this.m_uiPathList.mouseHandler = new Handler(this, function (e, i) {
        if (e.type === Laya.Event.CLICK) {
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
        }
    });
};

// Init the weather UI.
DrivingUI.prototype.initWeatherUI = function () {
    this.m_uiWeather_temperature.on(Laya.Event.INPUT, this, function (e) {
        // Input: UI -> Model
        var data = parseFloat(e.text);
        if (isFinite(data)) {
            this.client.scene.weather_info.temperature = data;
        }
    });
    this.m_uiWeather_temperature.on(Laya.Event.BLUR, this, function (e) {
        // Blur: Model -> UI
        this.client.fire("weather_info");
    });

    this.m_uiWeather_timeOfDay.on(Laya.Event.INPUT, this, function (e) {
        // Input: UI -> Model
        var data = parseFloat(e.text);
        if (isFinite(data)) {
            this.client.scene.weather_info.time_of_day = data;
        }
    });
    this.m_uiWeather_timeOfDay.on(Laya.Event.BLUR, this, function (e) {
        // Blur: Model -> UI
        this.client.fire("weather_info");
    });

    this.m_uiWeather_rainType.on(Laya.Event.CHANGE, this, function (e) {
        // Change: UI -> Model
        this.client.scene.weather_info.rain_type = e.target.selectedIndex > 0;
    });

    this.m_uiWeather_snowType.on(Laya.Event.CHANGE, this, function (e) {
        // Change: UI -> Model
        this.client.scene.weather_info.snow_type = e.target.selectedIndex > 0;
    });

    this.m_uiWeather_fogType.on(Laya.Event.CHANGE, this, function (e) {
        // Change: UI -> Model
        this.client.scene.weather_info.fog_type = e.target.selectedIndex > 0;
    });
};

// Init the traffic UI.
DrivingUI.prototype.initTrafficUI = function () {
    this.m_uiTraffic_carDensity_slider.on(Laya.Event.CHANGED, this, function () {
        // Changed: UI -> Model
        this.client.scene.traffic_info.car_density = this.m_uiTraffic_carDensity_slider.value;
        // Changed: Model -> UI
        this.client.fire("traffic_info");
    });
    this.m_uiTraffic_carDensity_input.on(Laya.Event.INPUT, this, function (e) {
        // Input: UI -> Model
        var data = parseFloat(e.text);
        if (isFinite(data)) {
            this.client.scene.traffic_info.car_density = data;
        }
    });
    this.m_uiTraffic_carDensity_input.on(Laya.Event.BLUR, this, function (e) {
        // Blur: Model -> UI
        this.client.fire("traffic_info");
    });

    this.m_uiTraffic_carIrregularity_slider.on(Laya.Event.CHANGED, this, function () {
        // Changed: UI -> Model
        this.client.scene.traffic_info.car_irregularity = this.m_uiTraffic_carIrregularity_slider.value;
        // Changed: Model -> UI
        this.client.fire("traffic_info");
    });
    this.m_uiTraffic_carIrregularity_input.on(Laya.Event.INPUT, this, function (e) {
        // Input: UI -> Model
        var data = parseFloat(e.text);
        if (isFinite(data)) {
            this.client.scene.traffic_info.car_irregularity = data;
        }
    });
    this.m_uiTraffic_carIrregularity_input.on(Laya.Event.BLUR, this, function (e) {
        // Blur: Model -> UI
        this.client.fire("traffic_info");
    });

    this.m_uiTraffic_pedestrainDensity_slider.on(Laya.Event.CHANGED, this, function () {
        // Changed: UI -> Model
        this.client.scene.traffic_info.pedestrain_density = this.m_uiTraffic_pedestrainDensity_slider.value;
        // Changed: Model -> UI
        this.client.fire("traffic_info");
    });
    this.m_uiTraffic_pedestrainDensity_input.on(Laya.Event.INPUT, this, function (e) {
        // Input: UI -> Model
        var data = parseFloat(e.text);
        if (isFinite(data)) {
            this.client.scene.traffic_info.pedestrain_density = data;
        }
    });
    this.m_uiTraffic_pedestrainDensity_input.on(Laya.Event.BLUR, this, function (e) {
        // Blur: Model -> UI
        this.client.fire("traffic_info");
    });
};

// Init the Sensor Control UI
DrivingUI.prototype.initSensorControlUI = function () {
    this.m_uiSensorButton.on(Laya.Event.CLICK, this, function () {
        this.client.startRos();
    });

    // Hide the scrollb bar and use dragging.
    this.m_uiSensorList.scrollBar.hide = true;
    this.m_uiSensorList.scrollBar.elasticBackTime = 200;
    this.m_uiSensorList.scrollBar.elasticDistance = 50;

    // No data
    this.m_uiSensorList.array = [];
};

// Refresh the scene list UI.
DrivingUI.prototype.refreshSceneListUI = function () {
    var data = [];

    this.client.scene_list.forEach(function (v) {
        data.push({
            label: {
                text: v.scene_info.scene,
            },
            image: {
                skin: "",
            },
        });
    });

    this.m_uiSceneList.array = data;
};

// Refresh the path UI.
DrivingUI.prototype.refreshPathUI = function () {
    var data = [];

    // Not available for now.
    data.push({
        label: {
            text: "default",
        },
        image: {
            skin: "",
        },
    });

    this.m_uiPathList.array = data;
};

// Refresh the weather UI.
DrivingUI.prototype.refreshWeatherUI = function () {
    this.m_uiWeather_temperature.text = "" + this.client.scene.weather_info.temperature;
    this.m_uiWeather_timeOfDay.text = "" + this.client.scene.weather_info.time_of_day;
    this.m_uiWeather_rainType.selectedIndex = this.client.scene.weather_info.rain_type ? 1 : 0;
    this.m_uiWeather_snowType.selectedIndex = this.client.scene.weather_info.snow_type ? 1 : 0;
    this.m_uiWeather_fogType.selectedIndex = this.client.scene.weather_info.fog_type ? 1 : 0;
};

// Refresh the traffic UI.
DrivingUI.prototype.refreshTrafficUI = function () {
    this.m_uiTraffic_carDensity_slider.value = this.client.scene.traffic_info.car_density;
    this.m_uiTraffic_carDensity_input.text = "" + this.client.scene.traffic_info.car_density;
    this.m_uiTraffic_carIrregularity_slider.value = this.client.scene.traffic_info.car_irregularity;
    this.m_uiTraffic_carIrregularity_input.text = "" + this.client.scene.traffic_info.car_irregularity;
    this.m_uiTraffic_pedestrainDensity_slider.value = this.client.scene.traffic_info.pedestrain_density
    this.m_uiTraffic_pedestrainDensity_input.text = "" + this.client.scene.traffic_info.pedestrain_density;
};

// Refresh the sensor control UI.
DrivingUI.prototype.refreshSensorControlUI = function () {
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
DrivingUI.prototype.refreshCarStateUI = function () {
    // No data ?
    if (!this.client.car.car_state) {
        return;
    }

    this.m_uiDrive_speed.text = this.client.car.car_state.speed.toFixed(3);
    this.m_uiDrive_accer.text = this.client.car.car_state.accer.toFixed(3);
    this.m_uiDrive_steerSlider.value = this.client.car.car_state.steer;
    this.m_uiDrive_steerImage.rotation = this.client.car.car_state.steer * 540;
};
