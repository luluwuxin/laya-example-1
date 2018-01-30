"use strict";

function DrivingControl(client, ui) {
    DrivingControl.super(this);

    // Start, Stop and Pause buttons.
    this.m_uiDriveButton1 = ui.m_uiDriveButton1;
    this.m_uiDriveButton2 = ui.m_uiDriveButton2;
    this.m_uiDriveButton3 = ui.m_uiDriveButton3;

    // Car States UI.
    this.m_uiDrive_speed = ui.m_uiDrive_speed;
    this.m_uiDrive_accer = ui.m_uiDrive_accer;
    this.m_uiDrive_steerSlider = ui.m_uiDrive_steerSlider;
    this.m_uiDrive_steerImage = ui.m_uiDrive_steerImage;

    // Init the UI elements.
    this.initDriveButtonUI();

    // Model and WebSocket backend.
    this.client = client
      .on("drive_info", this, function () {
          this.refreshDriveButtonUI();
      })
      .on("car_state", this, function () {
          this.refreshCarStateUI();
      });
}
Laya.class(DrivingControl, "DrivingControl", Laya.EventDispatcher);

// Events
DrivingControl.BEFORE_START = "DrivingControl.BEFORE_START";

// Init the Stop, Start and Pause button UI.
DrivingControl.prototype.initDriveButtonUI = function () {
    // Stop
    this.m_uiDriveButton1.on(Laya.Event.CLICK, this, function () {
        this.client.sendDriveInfo(0);
    });

    // Start
    this.m_uiDriveButton2.on(Laya.Event.CLICK, this, function () {
        this.event(DrivingControl.BEFORE_START);
        this.client.sendDriveInfo(1);
    });

    // Pause
    this.m_uiDriveButton3.on(Laya.Event.CLICK, this, function () {
        this.client.sendDriveInfo(2);
    });
};

// Refresh the Stop, Start and Pause button UI.
DrivingControl.prototype.refreshDriveButtonUI = function () {
    // No data ?
    if (!this.client.data.drive_info) {
        return;
    }

    switch (this.client.data.drive_info.status) {
    case 0: // stop
        this.m_uiDriveButton1.visible = false;
        this.m_uiDriveButton2.visible = true;
        this.m_uiDriveButton3.visible = false;
        break;
    case 1: // run
        this.m_uiDriveButton1.visible = true;
        this.m_uiDriveButton2.visible = false;
        this.m_uiDriveButton3.visible = true;
        break;
    case 2: // pause
        this.m_uiDriveButton1.visible = true;
        this.m_uiDriveButton2.visible = true;
        this.m_uiDriveButton3.visible = false;
        break;
    }
};

// Refresh the car state UI.
DrivingControl.prototype.refreshCarStateUI = function () {
    // No data ?
    if (!this.client.data.car_state) {
        return;
    }

    this.m_uiDrive_speed.text = this.client.data.car_state.speed.toFixed(3);
    this.m_uiDrive_accer.text = this.client.data.car_state.accer.toFixed(3);
    this.m_uiDrive_steerSlider.value = this.client.data.car_state.steer;
    this.m_uiDrive_steerImage.rotation = this.client.data.car_state.steer * 90;
};
