// Class for the Home webpage.
//
function MainUI(pageChooser)
{
    MainUI.super(this);

    // Initialize UI elements
    this.initMainUI();

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
}
Laya.class(MainUI, "MainUI", MainPageUI);

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

