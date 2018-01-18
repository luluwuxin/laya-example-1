// Class for the Car and Sensor Setup webpage.
//
function SetupUI(pages, client)
{
    SetupUI.super(this);

    // Initialize UI elements
    this.initBannerUI();

    // Pages for switching
    this.pages = pages;
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
