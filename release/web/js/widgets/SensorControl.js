"use strict";

function SensorControl(pageChooser, client, ui) {
    SensorControl.super(this);

    // Pages for switching
    this.pageChooser = pageChooser;

    // Start, Stop and Pause buttons.
    this.m_uiSensorButton1 = ui.m_uiSensorButton1;
    this.m_uiSensorButton2 = ui.m_uiSensorButton2;
    this.m_uiSensorButton3 = ui.m_uiSensorButton3;

    // Sensor list.
    this.m_uiSensorList = ui.m_uiSensorList;

    // Init the UI elements.
    this.initSensorButtonUI();
    this.initSensorListUI();

    // Model and WebSocket backend.
    this.client = client
      .on("ros_info", this, function () {
          this.refreshSensorButtonUI();
          this.refreshSensorListUI();
      });
}
Laya.class(SensorControl, "SensorControl", Laya.EventDispatcher);

// Init the Stop, Start and Pause button UI.
SensorControl.prototype.initSensorButtonUI = function () {
    // Stop
    this.m_uiSensorButton1.on(Laya.Event.CLICK, this, function () {
        this.client.sendRosInfo(0);
    });

    // Start
    this.m_uiSensorButton2.on(Laya.Event.CLICK, this, function () {
        this.client.sendRosInfo(1);
    });

    // Pause
    this.m_uiSensorButton3.on(Laya.Event.CLICK, this, function () {
        this.client.sendRosInfo(2);
    });
};

// Init the sensor list UI.
SensorControl.prototype.initSensorListUI = function () {
    this.m_uiSensorList.on(Laya.Event.RENDER, this, function (e) {
        var checkbox = e.getChildByName("checkbox");
        var label    = e.getChildByName("label");
        
        checkbox.offAll(Laya.Event.CLICK);
        checkbox.on(Laya.Event.CLICK, this, function (ee) {
            this.client.data.ros_info.config.forEach(function (v) {
                if (v.name === label.text) {
                    v.running = !checkbox.selected;
                }
            });
            this.client.send("ros_info");
        });
    });

    // No data
    this.m_uiSensorList.array = [];
};

// Refresh the Stop, Start and Pause button UI.
SensorControl.prototype.refreshSensorButtonUI = function () {
    // No data ?
    if (!this.client.data.ros_info) {
        return;
    }

    switch (this.client.data.ros_info.status) {
    case 0: // stop
        this.m_uiSensorButton1.visible = false;
        this.m_uiSensorButton2.visible = true;
        this.m_uiSensorButton3.visible = false;
        break;
    case 1: // run
        this.m_uiSensorButton1.visible = true;
        this.m_uiSensorButton2.visible = false;
        this.m_uiSensorButton3.visible = true;
        break;
    case 2: // pause
        this.m_uiSensorButton1.visible = true;
        this.m_uiSensorButton2.visible = true;
        this.m_uiSensorButton3.visible = false;
        break;
    }
};

// Refresh the sensor list UI.
SensorControl.prototype.refreshSensorListUI = function () {
    // No data ?
    if (!this.client.data.ros_info) {
        this.m_uiSensorList.array = [];
        return;
    }

    var data = [];
    this.client.data.ros_info.config.forEach(function (v) {
        if (v.name === "raw_drive" || v.name === "AirSimDriver") return;
        data.push({
            checkbox: {
                selected: v.running,
            },
            label: {
                text: v.name,
            },
        });
    });
    this.m_uiSensorList.array = data;
};
