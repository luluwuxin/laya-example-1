"use strict";

function BannerControl(pageChooser, ui) {
    BannerControl.super(this);

    // Pages for switching
    this.pageChooser = pageChooser;

    // Banner Navigations
    ui.m_uiBanner_logo.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("mainUI");
    });
    ui.m_uiBanner_home.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("mainUI");
    });
    ui.m_uiBanner_setup.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("setupUI");
    });
    ui.m_uiBanner_scene.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("drivingUI");
    });
    ui.m_uiBanner_scenario.on(Laya.Event.CLICK, this, function () {
        this.pageChooser.goTo("scenarioUI");
    });
}
Laya.class(BannerControl, "BannerControl", Laya.EventDispatcher);
