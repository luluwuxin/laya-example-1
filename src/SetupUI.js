// Class for the Car and Sensor Setup webpage.
//
function SetupUI(pageChooser, client)
{
    SetupUI.super(this);

    // Initialize UI elements
    this.initBannerUI();
    this.initCarListUI();
    this.initCarBoxUI();
    this.initInventoryListUI();
    this.initParameterListUI();

    // Pages for switching
    this.pageChooser = pageChooser;

    // Model and WebSocket backend
    this.client = client
      .on("__init_car_list", this, function () {
          this.refreshCarListUI();
          this.refreshCarBoxUI();
          this.refreshParameterListUI();
      })
      .on("car_config", this, function () {
          this.refreshCarBoxUI();
          this.refreshParameterListUI();
      });
}
Laya.class(SetupUI, "SetupUI", SetupPageUI);

// Init the banner UI.
SetupUI.prototype.initBannerUI = function () {
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

// Init the car list UI.
SetupUI.prototype.initCarListUI = function () {
    this.m_uiCarList.array = [];

    // Mouse events.
    this.m_uiCarList.mouseHandler = new Handler(this, function (e, i) {
        if (e.type === Laya.Event.CLICK) {
            console.log("Choose " + i + "th car.");
        }
    });
};

// Init the car and sensor box UI.
SetupUI.prototype.initCarBoxUI = function () {
    // Init the car and sensors renderer
    this.carRenderer = new CarRenderer(this.m_uiCarBox);
    this.carRenderer.loadCar("LayaScene_SuvCar/SuvCar.lh");
    // this.carRenderer.loadAxis();

    this.m_uiCarBox.on(Laya.Event.CLICK, this, function (e) {
        // Laya scene and viewport are in global space.
        this.selectInfo = this.carRenderer.select(e.stageX, e.stageY);
        this.refreshParameterListUI();
    });
};

// Init the inventory list UI.
SetupUI.prototype.initInventoryListUI = function () {
    // Allow dragging (into car box).
    this.m_uiInventoryList.on(Laya.Event.RENDER, this, function (e) {
        var templateJson = e.getChildByName("templateJson").text;
        var icon = e.getChildByName("icon");
        var label = e.getChildByName("label");
        e.on(Laya.Event.MOUSE_DOWN, this, function (e) {
            // Already dragging ?
            if (e.indicator) return;

            // A new dynamic image object as the dragging indicator.
            var indicator = e.indicator = new Laya.Image(icon.skin);
            indicator.x = e.stageX;
            indicator.y = e.stageY;
            Laya.stage.addChild(indicator);

            // Enable dragging on the indicator.
            indicator.startDrag();

            function HandleDrop() {
                // Car Box ?
                if (e.indicator) {
                    e.indicator = undefined;
                    indicator.stopDrag();
                    if (this.m_uiCarBox.hitTestPoint(indicator.x, indicator.y)) {
                        this.client.addSensor(JSON.parse(templateJson));
                    }
                    indicator.destroy();
                }
            }

            // Drop the indicator onto some object.
            indicator.on(Laya.Event.DRAG_END, this, HandleDrop);
            indicator.on(Laya.Event.MOUSE_UP, this, HandleDrop);
        });
    });

    // Initial inventory.
    this.m_uiInventoryList.array = [
        {
            label: {
                text: "Camera",
            },
            icon: {
                skin: "custom/image_inventory_camera.png",
            },
            templateJson: {
                text: JSON.stringify({
                    sid: -1, type: 0, x: 0, y: 0, z: 0, roll: 0, pitch: 0, yaw: 0,
                    params: {
                        fov: 45,
                        ResolutionWidth: 1024,
                        ResolutionHeight: 768,
                    },
                }),
            },
        },
        {
            label: {
                text: "Lidar",
            },
            icon: {
                skin: "custom/image_inventory_lidar.png",
            },
            templateJson: {
                text: JSON.stringify({
                    sid: -1, type: 1, x: 0, y: 0, z: 0, roll: 0, pitch: 0, yaw: 0,
                }),
            },
        },
        {
            label: {
                text: "Radar",
            },
            icon: {
                skin: "custom/image_inventory_radar.png",
            },
            templateJson: {
                text: JSON.stringify({
                    sid: -1, type: 2, x: 0, y: 0, z: 0, roll: 0, pitch: 0, yaw: 0,
                    params: {
                        LongRangeAzimuthFieldOfView: 20,
                        MidRangeAzimuthFieldOfView: 90,
                        VerticalFieldOfView: 5,
                        MinRange: 100,
                        LongRangeMaxRange: 10000,
                        MidRangeMaxRange: 5000,
                        MinRangeRate: -10000,
                        MaxRangeRate: 10000,
                        LongRangeAzimuthResolution: 4,
                        MidRangeAzimuthResolution: 12,
                        VerticalResolution: 10,
                        LongRangeRangeResolution: 250,
                        MidRangeRangeResolution: 125,
                        RangeRateResolution: 50,
                        MaxNumDetections: 64,
                        UseMidRange: true,
                    },
                }),
            },
        },
    ];
};

// Init the parameter list UI.
SetupUI.prototype.initParameterListUI = function () {
    // Add callbacks for the items in the list.
    this.m_uiParameterList.on(Laya.Event.RENDER, this, function (e) {
        var label = e.getChildByName("label");
        var input = e.getChildByName("input");
        input.on(Laya.Event.INPUT, this, function (e) {
            // Input: UI -> Model
            // Generalize: selectObj should be a shadow object and its setter
            //             to set the property of the raw object without knowing
            //             the parameter is sensor.x or sensor.params.x
            var paramsObj = this.selectObj || {};
            if (typeof paramsObj.params === "object" && paramsObj.params.hasOwnProperty(label.text)) {
                paramsObj = paramsObj.params;
            }
            if (typeof paramsObj[label.text] === "number") {
                var data = parseFloat(e.text);
                if (isFinite(data)) {
                    paramsObj[label.text] = data;
                }
            } else if (typeof paramsObj[label.text] === "string") {
                paramsObj[label.text] = e.text;
            }
            // Refresh the preview
            this.refreshCarBoxUI();
        });
        input.on(Laya.Event.BLUR, this, function (e) {
            // Blur: Model -> UI
            this.client.fire("car_config");
        });
    });

    // Delete button.
    this.m_uiParameterList_delete.on(Laya.Event.CLICK, this, function () {
        if (this.selectInfo && this.selectInfo.type === "sensor") {
            this.client.removeSensor(this.selectInfo.sid);
            this.selectInfo = undefined;
        }
    });

    // No parameters by default.
    this.m_uiParameterList.array = [];
};

// Refresh the scene list UI.
SetupUI.prototype.refreshCarListUI = function () {
    var data = [
        {
            label: {
                text: "SUV",
            },
        }
    ];

    this.m_uiCarList.array = data;
};

// Refresh the car and sensor box UI.
SetupUI.prototype.refreshCarBoxUI = function () {
    this.carRenderer.refreshCarConfig(this.client.car.car_config);
};

// Refresh the parameters list UI.
SetupUI.prototype.refreshParameterListUI = function () {
    // Nothing to show.
    if (!this.selectInfo) {
        return;
    }

    // A list of parameter name and its value.
    var data = [];

    if (this.selectInfo && this.selectInfo.type === "sensor") {
        // Find the sensor whose .sid matches the current selection.
        var blacklist = ["sid", "type", "params"];
        var selectInfo = this.selectInfo;
        var sensor = this.client.car.car_config.config.find(function (v) {
            return v.sid === selectInfo.sid;
        });
        if (sensor) {
            this.selectObj = sensor;
            Object.entries(sensor).forEach(function (kv) {
                if (blacklist.indexOf(kv[0]) >= 0) return;
                data.push({
                    label: {
                        text: kv[0],
                    },
                    input: {
                        text: "" + kv[1],
                    },
                });
            });
            if (typeof sensor.params === "object") {
                Object.entries(sensor.params).forEach(function (kv) {
                    data.push({
                        label: {
                            text: kv[0],
                        },
                        input: {
                            text: "" + kv[1],
                        },
                    });
                });
            }
        }
    }

    this.m_uiParameterList.array = data;

    // Show delete button if we have something to show (or delete..)
    this.m_uiParameterList_delete.visible = data.length > 0;
};
