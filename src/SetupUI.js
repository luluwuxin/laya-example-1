// Class for the Car and Sensor Setup webpage.
//
function SetupUI(pages, client)
{
    SetupUI.super(this);

    // Initialize UI elements
    this.initBannerUI();
    this.initCarListUI();
    this.initCarBoxUI();
    this.initPropListUI();

    // Pages for switching
    this.pages = pages;

    // Model and WebSocket backend
    this.client = client
      .on("__init_car_list", this, function () {
          this.refreshCarListUI();
          this.refreshCarBoxUI();
          this.refreshPropListUI();
      })
      .on("car_config", this, function () {
          this.refreshCarBoxUI();
          this.refreshPropListUI();
      });
}
Laya.class(SetupUI, "SetupUI", SetupPageUI);

// Init the banner UI.
SetupUI.prototype.initBannerUI = function () {
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
};

// Init the car list UI.
SetupUI.prototype.initCarListUI = function () {
    // Hide the scrollb bar and use dragging.
    this.m_uiCarList.scrollBar.hide = true;
    this.m_uiCarList.scrollBar.elasticBackTime = 200;
    this.m_uiCarList.scrollBar.elasticDistance = 50;

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
    this.carRenderer.loadCar("res/LayaScene_SuvCar/SuvCar.lh");
    // this.carRenderer.loadAxis();

    this.m_uiCarBox.on(Laya.Event.CLICK, this, function (e) {
        // Laya scene and viewport are in global space.
        this.selectInfo = this.carRenderer.select(e.stageX, e.stageY);
        this.refreshPropListUI();
    });
};

// Init the property list UI.
SetupUI.prototype.initPropListUI = function () {
    // Hide the scrollb bar and use dragging.
    this.m_uiPropList.scrollBar.hide = true;
    this.m_uiPropList.scrollBar.elasticBackTime = 200;
    this.m_uiPropList.scrollBar.elasticDistance = 50;

    // Add callbacks for the items in the list.
    this.m_uiPropList.on(Laya.Event.RENDER, this, function (e) {
        var label = e.getChildByName("label");
        var input = e.getChildByName("input");
        input.on(Laya.Event.INPUT, this, function (e) {
            // Input: UI -> Model
            if (typeof this.selectObj[label.text] === "number") {
                var data = parseFloat(e.text);
                if (isFinite(data)) {
                    this.selectObj[label.text] = data;
                }
            } else if (typeof this.selectObj[label.text] === "string") {
                this.selectObj[label.text] = data;
            }
            // Refresh the preview
            this.refreshCarBoxUI();
        });
        input.on(Laya.Event.BLUR, this, function (e) {
            // Blur: Model -> UI
            this.client.fire("car_config");
        });
    });

    // No properties by default.
    this.m_uiPropList.array = [];
};

// Refresh the scene list UI.
SetupUI.prototype.refreshCarListUI = function () {
    var data = [
        {
            label: {
                text: "default",
            },
            image: {
                skin: "",
            },
        }
    ];

    this.m_uiCarList.array = data;
};

// Refresh the car and sensor box UI.
SetupUI.prototype.refreshCarBoxUI = function () {
    this.carRenderer.refreshCarConfig(this.client.car.car_config);
};

// Refresh the property list UI.
SetupUI.prototype.refreshPropListUI = function () {
    // Nothing to show.
    if (!this.selectInfo) {
        return;
    }

    // A list of property name and its value.
    var data = [];

    if (this.selectInfo && this.selectInfo.type === "sensor") {
        // Find the sensor whose .sid matches the current selection.
        var blacklist = ["sid", "type"];
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
        }
    }

    this.m_uiPropList.array = data;
};
