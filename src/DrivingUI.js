// Class for the Open Scene Driving webpage.
//
function DrivingUI(pageChooser, client)
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

    // Pages for switching
    this.pageChooser = pageChooser;

    // Modal
    this.modalBlocker = new ModalBlocker(this);

    // Driving Control
    this.drivingControl = new DrivingControl(client, {
        m_uiDriveButton1: this.m_uiDriveButton1,
        m_uiDriveButton2: this.m_uiDriveButton2,
        m_uiDriveButton3: this.m_uiDriveButton3,
        m_uiDrive_speed: this.m_uiDrive_speed,
        m_uiDrive_accer: this.m_uiDrive_accer,
        m_uiDrive_steerSlider: this.m_uiDrive_steerSlider,
        m_uiDrive_steerImage: this.m_uiDrive_steerImage,
    });

    // Model and WebSocket backend
    this.client = client
      .on("scene_list", this, function () {
          this.refreshSceneListUI();
      })
      .on("scene_info", this, function () {
          this.refreshSceneListUI();
          this.refreshPathUI();
      })
      .on("weather_info", this, function () {
          this.refreshWeatherUI();
      })
      .on("traffic_info", this, function () {
          this.refreshTrafficUI();
      })
      .on("ros_info", this, function () {
          this.refreshSensorControlUI();
      })
      .on("loading", this, function () {
          this.modalBlocker.resume();
      });
}
Laya.class(DrivingUI, "DrivingUI", DrivingPageUI);

// Init the banner UI.
DrivingUI.prototype.initBannerUI = function () {
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

// Init the scene list UI.
DrivingUI.prototype.initSceneListUI = function () {
    // For each list item, ..
    this.m_uiSceneList.on(Laya.Event.RENDER, this, function (e) {
        var image = e.getChildByName("image");
        var label = e.getChildByName("label");

        // Choose this specific scene from the scene list.
        image.offAll(Laya.Event.DOUBLE_CLICK);
        image.on(Laya.Event.DOUBLE_CLICK, this, function (ee) {
            if (this.client.data.scene_info.scene === label.text) {
                return;
            }
            this.client.data.scene_info.scene = label.text;
            this.client.send("scene_info");
            this.modalBlocker.block();
        });
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
    // Temperature
    function CommitTemperature (input) {
        var data = parseFloat(input.text);
        if (isFinite(data) && this.client.data.weather_info.temperature !== data) {
            this.client.data.weather_info.temperature = data;
            this.client.send("weather_info");
        } else {
            this.client.fire("weather_info");
        }
    }
    this.m_uiWeather_temperature.on(Laya.Event.ENTER, this, CommitTemperature);
    this.m_uiWeather_temperature.on(Laya.Event.BLUR, this, CommitTemperature);

    // Time of Day
    function CommitTimeOfDay (input) {
        var data = parseFloat(input.text);
        if (isFinite(data) && this.client.data.weather_info.time_of_day !== data) {
            this.client.data.weather_info.time_of_day = data;
            this.client.send("weather_info");
        } else {
            this.client.fire("weather_info");
        }
    }
    this.m_uiWeather_timeOfDay.on(Laya.Event.ENTER, this, CommitTimeOfDay);
    this.m_uiWeather_timeOfDay.on(Laya.Event.BLUR, this, CommitTimeOfDay);

    // Rain
    this.m_uiWeather_rainType.on(Laya.Event.CHANGE, this, function (e) {
        var data = e.target.selectedIndex > 0;
        if (this.client.data.weather_info.rain_type !== data) {
            this.client.data.weather_info.rain_type = data;
            this.client.send("weather_info");
        }
    });

    // Snow
    this.m_uiWeather_snowType.on(Laya.Event.CHANGE, this, function (e) {
        var data = e.target.selectedIndex > 0;
        if (this.client.data.weather_info.snow_type !== data) {
            this.client.data.weather_info.snow_type = data;
            this.client.send("weather_info");
        }
    });

    // Fog
    this.m_uiWeather_fogType.on(Laya.Event.CHANGE, this, function (e) {
        var data = e.target.selectedIndex > 0;
        if (this.client.data.weather_info.fog_type !== data) {
            this.client.data.weather_info.fog_type = data;
            this.client.send("weather_info");
        }
    });
};

// Init the traffic UI.
DrivingUI.prototype.initTrafficUI = function () {
    // Car Density
    function CommitCarDensity (input) {
        var data = parseFloat(input.text);
        if (isFinite(data) && this.client.data.traffic_info.car_density !== data) {
            this.client.data.traffic_info.car_density = data;
            this.client.send("traffic_info");
        } else {
            this.client.fire("traffic_info");
        }
    }
    this.m_uiTraffic_carDensity_input.on(Laya.Event.ENTER, this, CommitCarDensity);
    this.m_uiTraffic_carDensity_input.on(Laya.Event.BLUR, this, CommitCarDensity);
    this.m_uiTraffic_carDensity_slider.on(Laya.Event.CHANGED, this, function () {
        this.client.data.traffic_info.car_density = this.m_uiTraffic_carDensity_slider.value;
        this.client.send("traffic_info");
    });

    // Car Irregularity
    function CommitCarIrregularity (input) {
        var data = parseFloat(input.text);
        if (isFinite(data) && this.client.data.traffic_info.car_irregularity !== data) {
            this.client.data.traffic_info.car_irregularity = data;
            this.client.send("traffic_info");
        } else {
            this.client.fire("traffic_info");
        }
    }
    this.m_uiTraffic_carIrregularity_input.on(Laya.Event.ENTER, this, CommitCarIrregularity);
    this.m_uiTraffic_carIrregularity_input.on(Laya.Event.BLUR, this, CommitCarIrregularity);
    this.m_uiTraffic_carIrregularity_slider.on(Laya.Event.CHANGED, this, function () {
        this.client.data.traffic_info.car_irregularity = this.m_uiTraffic_carIrregularity_slider.value;
        this.client.send("traffic_info");
    });

    // Pedestrain Density
    function CommitPedestrainDensity (input) {
        var data = parseFloat(input.text);
        if (isFinite(data) && this.client.data.traffic_info.pedestrain_density !== data) {
            this.client.data.traffic_info.pedestrain_density = data;
            this.client.send("traffic_info");
        } else {
            this.client.fire("traffic_info");
        }
    }
    this.m_uiTraffic_pedestrainDensity_input.on(Laya.Event.INPUT, this, CommitPedestrainDensity);
    this.m_uiTraffic_pedestrainDensity_input.on(Laya.Event.BLUR, this, CommitPedestrainDensity);
    this.m_uiTraffic_pedestrainDensity_slider.on(Laya.Event.CHANGED, this, function () {
        this.client.data.traffic_info.pedestrain_density = this.m_uiTraffic_pedestrainDensity_slider.value;
        this.client.send("traffic_info");
    });
};

// Init the Sensor Control UI
DrivingUI.prototype.initSensorControlUI = function () {
    this.m_uiSensorButton.on(Laya.Event.CLICK, this, function () {
        this.client.startRos();
        this.pageChooser.sensorChart.feedRandomData();
    });

    this.m_uiSensorList.on(Laya.Event.RENDER, this, function (e) {
        var checkbox = e.getChildByName("checkbox");
        var label    = e.getChildByName("label");
        
        checkbox.offAll(Laya.Event.CLICK);
        checkbox.on(Laya.Event.CLICK, this, function (ee) {
            this.client.data.ros_info.config.forEach(function (v) {
                if (v.name === label.text) {
                    v.running = checkbox.selected;
                }
            });
        });
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

// Refresh the scene list UI.
DrivingUI.prototype.refreshSceneListUI = function () {
    var data = [];
    var current = this.client.data.scene_info ? this.client.data.scene_info.scene : "";

    this.client.data.scene_list.data.forEach(function (v) {
        data.push({
            label: {
                text: v.scene,
            },
            image: {
                skin: v.image,
            },
            highlight: {
                visible: v.scene === current,
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
    this.m_uiWeather_temperature.text = "" + this.client.data.weather_info.temperature;
    this.m_uiWeather_timeOfDay.text = "" + this.client.data.weather_info.time_of_day;
    this.m_uiWeather_rainType.selectedIndex = this.client.data.weather_info.rain_type ? 1 : 0;
    this.m_uiWeather_snowType.selectedIndex = this.client.data.weather_info.snow_type ? 1 : 0;
    this.m_uiWeather_fogType.selectedIndex = this.client.data.weather_info.fog_type ? 1 : 0;
};

// Refresh the traffic UI.
DrivingUI.prototype.refreshTrafficUI = function () {
    this.m_uiTraffic_carDensity_slider.value = this.client.data.traffic_info.car_density;
    this.m_uiTraffic_carDensity_input.text = "" + this.client.data.traffic_info.car_density;
    this.m_uiTraffic_carIrregularity_slider.value = this.client.data.traffic_info.car_irregularity;
    this.m_uiTraffic_carIrregularity_input.text = "" + this.client.data.traffic_info.car_irregularity;
    this.m_uiTraffic_pedestrainDensity_slider.value = this.client.data.traffic_info.pedestrain_density
    this.m_uiTraffic_pedestrainDensity_input.text = "" + this.client.data.traffic_info.pedestrain_density;
};

// Refresh the sensor control UI.
DrivingUI.prototype.refreshSensorControlUI = function () {
    // No data ?
    if (!this.client.data.ros_info) {
        this.m_uiSensorList.array = [];
    }

    var data = [];
    this.client.data.ros_info.config.forEach(function (v) {
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
