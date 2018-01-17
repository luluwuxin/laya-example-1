// MVC classes for the Open Scene Driving webpage.
//
function DrivingUI()
{
    DrivingUI.super(this);

    // Model: A list of scenes and default settings.
    this.scene_list = [];

    // Model: The current scene in edit.
    this.scene_now = undefined;

    // Initialize WebSocket
    this.initWS();

    // Initialize UI elements
    this.initSceneListUI();
    this.initSettingTabUI();
    this.initPathUI();
    this.initWeatherUI();
    this.initTrafficUI();

    // Mock
    var _this = this;
    setTimeout(function () {
        _this.setSceneList(_this.getMockSceneList());
    }, 10);
}

//
// View
//

// Return a mock scene for testing.
DrivingPageUI.prototype.getMockSceneList = function () {
    return [
        {
            scene_info: {
                scene: "IndistrialCity",
                path: "default",
            },
            weather_info: {
                temperature: 25,
                time_of_day: "9:00",
                rain_type: true,
                snow_type: false,
                fog_type: "HeaveFog",
            },
            traffic_info: {
                car_density: 50,
                pedestrain_density: 19,
                car_irregularity: 29,
            },
        },
        {
            scene_info: {
                scene: "Changning",
                path: "default",
            },
            weather_info: {
                temperature: -10,
                time_of_day: "19:00",
                rain_type: false,
                snow_type: true,
                fog_type: "",
            },
            traffic_info: {
                car_density: 500,
                pedestrain_density: 109,
                car_irregularity: 209,
            },
        },
    ];
};

// Init the scene list UI.
DrivingPageUI.prototype.initSceneListUI = function () {
    // Hide the scrollb bar and use dragging.
    this.m_uiSceneList.scrollBar.hide = true;
    this.m_uiSceneList.scrollBar.elasticBackTime = 200;
    this.m_uiSceneList.scrollBar.elasticDistance = 50;

    // Mouse events.
    this.m_uiSceneList.mouseHandler = new Handler(this, function (e, i) {
        if (e.type === Laya.Event.CLICK) {
            this.setScene(i);
        }
    });
};

// Init the setting tab UI.
DrivingPageUI.prototype.initSettingTabUI = function () {
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
DrivingPageUI.prototype.initPathUI = function () {
    // Hide the scrollb bar and use dragging.
    this.m_uiPathList.scrollBar.hide = true;
    this.m_uiPathList.scrollBar.elasticBackTime = 200;
    this.m_uiPathList.scrollBar.elasticDistance = 50;

    // Mouse events.
    this.m_uiPathList.mouseHandler = new Handler(this, function (e, i) {
        if (e.type === Laya.Event.CLICK) {
            console.log("Choose " + i + "th path.");
        }
    });
};

// Init the weather UI.
DrivingPageUI.prototype.initWeatherUI = function () {
    this.m_uiWeather_temperature.on(Laya.Event.INPUT, this, function (e) {
        // Input: UI -> Model
        var data = parseFloat(e.text);
        if (isFinite(data)) {
            this.scene_now.weather_info.temperature = data;
        }
    });
    this.m_uiWeather_temperature.on(Laya.Event.BLUR, this, function (e) {
        // Blur: Model -> UI
        this.refreshWeatherUI();
    });

    this.m_uiWeather_timeOfDay.on(Laya.Event.INPUT, this, function (e) {
        // Input: UI -> Model
        this.scene_now.weather_info.time_of_day = e.text;
    });
    this.m_uiWeather_timeOfDay.on(Laya.Event.BLUR, this, function (e) {
        // Blur: Model -> UI
        this.refreshWeatherUI();
    });

    this.m_uiWeather_rainType.on(Laya.Event.CHANGE, this, function (e) {
        // Change: UI -> Model
        this.scene_now.weather_info.rain_type = e.target.selectedIndex > 0;
    });

    this.m_uiWeather_snowType.on(Laya.Event.CHANGE, this, function (e) {
        // Change: UI -> Model
        this.scene_now.weather_info.snow_type = e.target.selectedIndex > 0;
    });

    this.m_uiWeather_fogType.on(Laya.Event.CHANGE, this, function (e) {
        // Change: UI -> Model
        this.scene_now.weather_info.fog_type = e.target.selectedIndex > 0;
    });
};

// Init the traffic UI.
DrivingPageUI.prototype.initTrafficUI = function () {
    this.m_uiTraffic_carDensity_slider.on(Laya.Event.CHANGED, this, function () {
        // Changed: UI -> Model
        this.scene_now.traffic_info.car_density = this.m_uiTraffic_carDensity_slider.value;
        // Changed: Model -> UI
        this.refreshTrafficUI();
    });
    this.m_uiTraffic_carDensity_input.on(Laya.Event.INPUT, this, function (e) {
        // Input: UI -> Model
        var data = parseFloat(e.text);
        if (isFinite(data)) {
            this.scene_now.traffic_info.car_density = data;
        }
    });
    this.m_uiTraffic_carDensity_input.on(Laya.Event.BLUR, this, function (e) {
        // Blur: Model -> UI
        this.refreshTrafficUI();
    });

    this.m_uiTraffic_carIrregularity_slider.on(Laya.Event.CHANGED, this, function () {
        // Changed: UI -> Model
        this.scene_now.traffic_info.car_irregularity = this.m_uiTraffic_carIrregularity_slider.value;
        // Changed: Model -> UI
        this.refreshTrafficUI();
    });
    this.m_uiTraffic_carIrregularity_input.on(Laya.Event.INPUT, this, function (e) {
        // Input: UI -> Model
        var data = parseFloat(e.text);
        if (isFinite(data)) {
            this.scene_now.traffic_info.car_irregularity = data;
        }
    });
    this.m_uiTraffic_carIrregularity_input.on(Laya.Event.BLUR, this, function (e) {
        // Blur: Model -> UI
        this.refreshTrafficUI();
    });

    this.m_uiTraffic_pedestrainDensity_slider.on(Laya.Event.CHANGED, this, function () {
        // Changed: UI -> Model
        this.scene_now.traffic_info.pedestrain_density = this.m_uiTraffic_pedestrainDensity_slider.value;
        // Changed: Model -> UI
        this.refreshTrafficUI();
    });
    this.m_uiTraffic_pedestrainDensity_input.on(Laya.Event.INPUT, this, function (e) {
        // Input: UI -> Model
        var data = parseFloat(e.text);
        if (isFinite(data)) {
            this.scene_now.traffic_info.pedestrain_density = data;
        }
    });
    this.m_uiTraffic_pedestrainDensity_input.on(Laya.Event.BLUR, this, function (e) {
        // Blur: Model -> UI
        this.refreshTrafficUI();
    });
};

// Refresh the scene list UI.
DrivingPageUI.prototype.refreshSceneListUI = function () {
    var data = [];

    this.scene_list.forEach(function (v) {
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
DrivingPageUI.prototype.refreshPathUI = function () {
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
DrivingPageUI.prototype.refreshWeatherUI = function () {
    this.m_uiWeather_temperature.text = "" + this.scene_now.weather_info.temperature;
    this.m_uiWeather_timeOfDay.text = "" + this.scene_now.weather_info.time_of_day;
    this.m_uiWeather_rainType.selectedIndex = this.scene_now.weather_info.rain_type ? 1 : 0;
    this.m_uiWeather_snowType.selectedIndex = this.scene_now.weather_info.snow_type ? 1 : 0;
    this.m_uiWeather_fogType.selectedIndex = this.scene_now.weather_info.fog_type ? 1 : 0;
};

// Refresh the traffic UI.
DrivingPageUI.prototype.refreshTrafficUI = function () {
    this.m_uiTraffic_carDensity_slider.value = this.scene_now.traffic_info.car_density;
    this.m_uiTraffic_carDensity_input.text = "" + this.scene_now.traffic_info.car_density;
    this.m_uiTraffic_carIrregularity_slider.value = this.scene_now.traffic_info.car_irregularity;
    this.m_uiTraffic_carIrregularity_input.text = "" + this.scene_now.traffic_info.car_irregularity;
    this.m_uiTraffic_pedestrainDensity_slider.value = this.scene_now.traffic_info.pedestrain_density
    this.m_uiTraffic_pedestrainDensity_input.text = "" + this.scene_now.traffic_info.pedestrain_density;
};

//
// Controller
//

DrivingPageUI.prototype.setSceneList = function (scene_list) {
    if (!Array.isArray(scene_list) || scene_list.length === 0) {
        throw new Error("Invalid scene list: " + JSON.stringify(scene_list));
    }

    // Replace the model with a clone of the scene list.
    this.scene_list = JSON.parse(JSON.stringify(scene_list));

    // Populate the current scene settings.
    this.setScene(0);

    // Model -> UI
    this.refreshSceneListUI();
};

DrivingPageUI.prototype.setScene = function (i) {
    if (typeof i !== "number" || i < 0 || i >= this.scene_list.length) {
        throw new Error("Invalid scene index: " + i);
    }

    // Discard the current scene settings.
    this.scene_now = JSON.parse(JSON.stringify(this.scene_list[i]));

    // Model -> UI
    this.refreshPathUI();
    this.refreshWeatherUI();
    this.refreshTrafficUI();
};

//
// WebSocket Client
//

// Connect to the backend.
DrivingPageUI.prototype.initWS = function () {
    this.socket = new Laya.Socket();
    this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
    this.socket.connectByUrl("ws://" + 
                             (window.location.host || "localhost") +
                             ":8080");

    // On connection established
    this.socket.on(Laya.Event.OPEN, this, function (e) {
        console.info("WebSocket open: " + e.target.url);

        // Claim that this is a Web Client
        this.socket.send(JSON.stringify({
            method: "auth",
            type: 0, // Web Client
        }));
    });

    // On message from remote
    this.socket.on(Laya.Event.MESSAGE, this, function (msg) {
        console.info(">> " + msg);
    });

    // On connection close
    this.socket.on(Laya.Event.CLOSE, this, function (e) {
        console.info("WebSocket close: " + e.target.url);
    });

    // On connection error
    this.socket.on(Laya.Event.ERROR, this, function (e) {
        // Laya ate the Error ?
        console.error("WebSocket error: " + e.target.url);
    });
};

Laya.class(DrivingUI, "DrivingUI", DrivingPageUI);
