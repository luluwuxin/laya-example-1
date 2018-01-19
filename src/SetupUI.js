// Class for the Car and Sensor Setup webpage.
//
function SetupUI(pages, client)
{
    SetupUI.super(this);

    // Initialize UI elements
    this.initBannerUI();
    this.initCarListUI();
    this.initCarBoxUI();

    // Pages for switching
    this.pages = pages;

    // Model and WebSocket backend
    this.client = client
      .on("__init_car_list", this, function () {
          this.refreshCarListUI();
          this.refreshCarBoxUI();
      })
      .on("car_config", this, function () {
          this.refreshCarBoxUI();
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
    this.carRenderer.loadAxis();
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
