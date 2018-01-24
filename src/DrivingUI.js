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
    this.initSimControlUI();
    this.initDriveControlUI();

    // Pages for switching
    this.pages = pages;

    // Model and WebSocket backend
    this.client = client
      .on("scene_list", this, function () {
          this.refreshSceneListUI();
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
    // Mouse events.
    this.m_uiSceneList.mouseHandler = new Handler(this, function (e, i) {
        if (e.type === Laya.Event.CLICK) {
            // Choose the selected i-th scene.
            this.client.scene.scene_info.scene = this.client.scene.scene_list.data[i].scene;
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
    // Mouse events.
    this.m_uiPathList.mouseHandler = new Handler(this, function (e, i) {
        if (e.type === Laya.Event.CLICK) {
            // Only default path now.
        }
    });
    this.m_uiPathList.array = [];
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

    // No data
    this.m_uiSensorList.array = [];
};

// Init the Sim Control UI
DrivingUI.prototype.initSimControlUI = function () {
    this.m_uiSimButton.on(Laya.Event.CLICK, this, function () {
        this.client.startSim();
    });
};

// Init the Drive Control UI
DrivingUI.prototype.initDriveControlUI = function () {
    this.m_uiDriveButton.on(Laya.Event.CLICK, this, function () {
        this.client.startDrive();
    });
};

// Refresh the scene list UI.
DrivingUI.prototype.refreshSceneListUI = function () {
    var data = [];

    this.client.scene.scene_list.data.forEach(function (v) {
        data.push({
            label: {
                text: v.scene,
            },
            image: {
                skin: v.image,
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
            text: "Default",
        },
        image: {
            skin: "custom/image_path_default.png",
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
