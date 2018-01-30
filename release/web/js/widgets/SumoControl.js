"use strict";

function SumoControl(client, ui) {
    SumoControl.super(this);

    // Start, Stop and Pause buttons.
    this.m_uiSumoButton1 = ui.m_uiSumoButton1;
    this.m_uiSumoButton2 = ui.m_uiSumoButton2;
    this.m_uiSumoButton3 = ui.m_uiSumoButton3;

    // Init the UI elements.
    this.initSumoButtonUI();

    // Model and WebSocket backend.
    this.client = client
      .on("sumo_info", this, function () {
          this.refreshSumoButtonUI();
      });
}
Laya.class(SumoControl, "SumoControl", Laya.EventDispatcher);

// Init the Stop, Start and Pause button UI.
SumoControl.prototype.initSumoButtonUI = function () {
    // Stop
    this.m_uiSumoButton1.on(Laya.Event.CLICK, this, function () {
        this.client.sendSumoInfo(0);
    });

    // Start
    this.m_uiSumoButton2.on(Laya.Event.CLICK, this, function () {
        this.client.sendSumoInfo(1);
    });

    // Pause
    this.m_uiSumoButton3.on(Laya.Event.CLICK, this, function () {
        this.client.sendSumoInfo(2);
    });
};

// Refresh the Stop, Start and Pause button UI.
SumoControl.prototype.refreshSumoButtonUI = function () {
    // No data ?
    if (!this.client.data.sumo_info) {
        return;
    }

    switch (this.client.data.sumo_info.status) {
    case 0: // stop
        this.m_uiSumoButton1.visible = false;
        this.m_uiSumoButton2.visible = true;
        this.m_uiSumoButton3.visible = false;
        break;
    case 1: // run
        this.m_uiSumoButton1.visible = true;
        this.m_uiSumoButton2.visible = false;
        this.m_uiSumoButton3.visible = true;
        break;
    case 2: // pause
        this.m_uiSumoButton1.visible = true;
        this.m_uiSumoButton2.visible = true;
        this.m_uiSumoButton3.visible = false;
        break;
    }
};
