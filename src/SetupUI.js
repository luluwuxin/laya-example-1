// Class for the Car and Sensor Setup webpage.
//
function SetupUI(pageChooser, client) {
    SetupUI.super(this);

    // Initialize UI elements
    this.initCarConfigListUI();
    this.initCarBoxUI();
    this.initInventoryListUI();
    this.initParameterListUI();

    // Pages for switching
    this.pageChooser = pageChooser;

    // Banner Control
    this.bannerControl = new BannerControl(pageChooser, {
        m_uiBanner_logo: this.m_uiBanner_logo,
        m_uiBanner_home: this.m_uiBanner_home,
        m_uiBanner_setup: this.m_uiBanner_setup,
        m_uiBanner_scene: this.m_uiBanner_scene,
        m_uiBanner_scenario: this.m_uiBanner_scenario,
    });

    // This page maintains the current selection of car_config preset.
    this.currentCarConfigName = undefined;
    this.editingCarConfigName = undefined;

    // Model and WebSocket backend
    this.client = client
      .on("car_config_list", this, function () {
          this.refreshCarConfigListUI();
      })
      .on("car_config", this, function () {
          this.refreshCarBoxUI();
          this.refreshParameterListUI();
      });
}
Laya.class(SetupUI, "SetupUI", SetupPageUI);

// Init the car list UI.
SetupUI.prototype.initCarConfigListUI = function () {
    // No data.
    this.m_uiCarConfigList.array = [];

    // List elements
    this.m_uiCarConfigList.on(Laya.Event.RENDER, this, function (e) {
        var image  = e.getChildByName("image");
        var label  = e.getChildByName("label");
        var remove = e.getChildByName("remove");
        var input  = e.getChildByName("popupedit");

        // Choose this specific preset from the car config list.
        image.offAll(Laya.Event.DOUBLE_CLICK);
        image.on(Laya.Event.DOUBLE_CLICK, this, function () {
            if (this.currentCarConfigName === label.text) {
                // Unselect the preset.
                this.currentCarConfigName = undefined;
            } else {
                // Load the preset by name.
                this.client.loadCarConfig(label.text);

                // Save the name of the current preset.
                this.currentCarConfigName = label.text;
            }
            this.refreshCarConfigListUI();
        });

        // Edit the name of the specific preset.
        label.offAll(Laya.Event.DOUBLE_CLICK);
        label.on(Laya.Event.DOUBLE_CLICK, this, function () {
            // Copy the name of the preset, focus and select all.
            input.text = label.text;
            input.focus = true;
            input.select();

            // Show the popup input control.
            this.editingCarConfigName = label.text;
            this.refreshCarConfigListUI();
        });

        input.offAll(Laya.Event.BLUR);
        input.on(Laya.Event.BLUR, this, function () {
            // Hide the popup input control.
            this.editingCarConfigName = undefined;

            // Commit the name change.
            var newName = this.client.renameCarConfig(label.text, input.text);

            // Track the new name as current.
            if (this.currentCarConfigName === label.text) {
                this.currentCarConfigName = newName;
            }
        });

        input.offAll(Laya.Event.ENTER);
        input.on(Laya.Event.ENTER, this, function () {
            // Hide the popup input control.
            this.editingCarConfigName = undefined;
            input.focus = false;

            // Commit the name change.
            var newName = this.client.renameCarConfig(label.text, input.text);

            // Track the new name as current.
            if (this.currentCarConfigName === label.text) {
                this.currentCarConfigName = newName;
            }
        });

        // Remove this specific preset from the car config list.
        remove.offAll(Laya.Event.CLICK);
        remove.on(Laya.Event.CLICK, this, function () {
            // Remove the preset by name.
            this.currentCarConfigName = undefined;
            this.client.removeCarConfig(label.text);
        });
    });

    // Copy the current car_config as a new preset.
    this.m_uiCarConfigList_AddButton.on(Laya.Event.CLICK, this, function () {
        this.client.addCarConfig();
    });
};

// Init the car and sensor box UI.
SetupUI.prototype.initCarBoxUI = function () {
    // Init the car and sensors renderer
    this.carRenderer = new CarRenderer(this.m_uiCarBox);
    this.carRenderer.loadCar("LayaScene_SM_Jeep_Wrangler/SM_Jeep_Wrangler.lh");
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
        e.offAll(Laya.Event.MOUSE_DOWN);
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
                        this.client.saveCarConfig(this.currentCarConfigName);
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

        input.offAll(Laya.Event.INPUT);
        input.on(Laya.Event.INPUT, this, function (e) {
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
            this.refreshCarBoxUI();
        });

        input.offAll(Laya.Event.ENTER);
        input.on(Laya.Event.ENTER, this, function (e) {
            this.client.send("car_config");
            this.client.saveCarConfig(this.currentCarConfigName);
        });

        input.offAll(Laya.Event.BLUR);
        input.on(Laya.Event.BLUR, this, function (e) {
            this.client.send("car_config");
            this.client.saveCarConfig(this.currentCarConfigName);
        });
    });

    // Delete button.
    this.m_uiParameterList_delete.on(Laya.Event.CLICK, this, function () {
        if (this.selectInfo && this.selectInfo.type === "sensor") {
            this.client.removeSensor(this.selectInfo.sid);
            this.client.saveCarConfig(this.currentCarConfigName);
            this.selectInfo = undefined;
        }
    });

    // No parameters by default.
    this.m_uiParameterList.array = [];
};

// Refresh the scene list UI.
SetupUI.prototype.refreshCarConfigListUI = function () {
    var data = [];

    var _this = this;
    this.client.data.car_config_list.list.forEach(function (p) {
        var isCurrent = (p.name === _this.currentCarConfigName);
        var isEditing = (p.name === _this.editingCarConfigName); 
        data.push({
            label: {
                visible: !isEditing,
                text: p.name,
            },
            popupedit: {
                visible: isEditing,
            },
            highlight: {
                visible: isCurrent,
            },
            remove: {
                visible: isCurrent,
            },
        });
    });

    this.m_uiCarConfigList.array = data;
};

// Refresh the car and sensor box UI.
SetupUI.prototype.refreshCarBoxUI = function () {
    this.carRenderer.refreshCarConfig(this.client.data.car_config);
};

// Refresh the parameters list UI.
SetupUI.prototype.refreshParameterListUI = function () {
    // A list of parameter name and its value.
    var data = [];

    if (this.selectInfo && this.selectInfo.type === "sensor") {
        // Find the sensor whose .sid matches the current selection.
        var blacklist = ["sid", "type", "params"];
        var selectInfo = this.selectInfo;
        var sensor = this.client.data.car_config.config.find(function (v) {
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
            switch (sensor.type) {
            case 0:
                this.m_uiSensorImage.skin = "custom/image_sensor_camera.png";
                break;
            case 1:
                this.m_uiSensorImage.skin = "custom/image_sensor_lidar.png";
                break;
            case 2:
                this.m_uiSensorImage.skin = "custom/image_sensor_radar.png";
                break;
            default:
                this.m_uiSensorImage.skin = "custom/image_sensor_type0.png";
                break;
            }
        }
    }

    this.m_uiParameterList.array = data;

    // Show delete button if we have something to show (or delete..)
    this.m_uiParameterList_delete.visible = data.length > 0;

    // No sensor
    if (data.length === 0) {
        // Reset sensor image
        this.m_uiSensorImage.skin = "custom/image_sensor_type0.png";
    }
};
