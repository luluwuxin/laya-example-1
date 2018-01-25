// Class for the Home webpage.
//
function MainUI(pageChooser)
{
    MainUI.super(this);

    // Initialize UI elements
    this.initBannerUI();
    this.initMainUI();

    // Pages for switching
    this.pageChooser = pageChooser;
}
Laya.class(MainUI, "MainUI", MainPageUI);

// Init the banner UI.
MainUI.prototype.initBannerUI = function () {
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

// Init the main UI.
MainUI.prototype.initMainUI = function () {
    this.m_uiButton_setup.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("setupUI");
    });
    this.m_uiButton_driving.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("drivingUI");
    });
    this.m_uiButton_scenario.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("scenarioUI");
    });
};

