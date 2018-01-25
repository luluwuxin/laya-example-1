"use strict";

function SensorChart(client) {
    SensorChart.super(this);

    // Client
    this.client = client;

    // Init after Laya create the stage div element.
    this.later(1, function () {
        this.init();
    });
}
Laya.class(SensorChart, "SensorChart", Laya.EventDispatcher);

SensorChart.prototype.later = function (time, handler) {
    // Call handler after time seconds. Mostly used to reschedule handler to event loop.
    var self = this;
    setTimeout(function() {
        handler.apply(self);
    }, time);
};

SensorChart.prototype.init = function () {
    // A container div element for the chartjs canvas.
    var container = document.getElementById("sensor-chart-container");

    // Init the container div element for the sensor chart.
    if (!container) {
        container = document.createElement("div");
        container.style.left     = "0px";
        container.style.top      = "0px";
        container.style.width    = "1px";
        container.style.height   = "1px";
        container.style.position = "absolute";
        container.style.zIndex   = 30000;
        container.id             = "sensor-chart-container";

        // Just in case. but we use absolute position..
        document.getElementById("layaContainer").appendChild(container);
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95

        // Handle resize
        var resizeTimeout;
        var self = this;
        window.addEventListener("resize", function () {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(function() {
                    resizeTimeout = null;
                    self.rebind();
                }, 66);
            }
        }, false);
<<<<<<< HEAD
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
=======
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
    }
    this.container = container;

    // Init chartjs and its canvas.
    if (!this.chart) {
        var canvas = document.createElement("canvas");
        container.appendChild(canvas);

        this.chart = new Chart(canvas, {
            type: "line",
            data: {},
            options: {
<<<<<<< HEAD
<<<<<<< HEAD
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        type: "time",
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
                    }]
=======
=======
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
                maintainAspectRatio: false,
                tooltips: {
                    enabled: false,
                },
                hover: {
                    mode: null,
                },
                scales: {
                    xAxes: [
                        {
                            type: "time",
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Date",
                            },
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "value",
                            },
                        },
                    ],
<<<<<<< HEAD
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
=======
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
                },
            },
        });
    }

    // Sensor list
    this.later(100, function () {
        var data = {
            labels: [],
            datasets: [
                {
                    label: "raw_point",
                    backgroundColor:"rgb(255, 0, 0)",
                    borderColor: "rgb(255, 0, 0)",
<<<<<<< HEAD
<<<<<<< HEAD
                    data: [
                        {x:new Date(), y:0}
                    ],
=======
                    data: [],
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
=======
                    data: [],
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
                    fill: false,
                }, {
                    label: "raw_image",
                    backgroundColor:"rgb(0, 0, 255)",
                    borderColor: "rgb(0, 0, 255)",
<<<<<<< HEAD
<<<<<<< HEAD
                    data: [
                        {x:new Date(), y:0}
                    ],
=======
                    data: [],
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
=======
                    data: [],
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
                    fill: false,
                }]
        };
        this.chart.data = data;
        this.chart.update();
    });

    this.later(1000, function AddDummyData() {
        this.chart.data.datasets[0].data.push( {
            x: new Date(),
            y: Math.random(),
        });
        this.chart.data.datasets[1].data.push( {
            x: new Date(),
            y: Math.random(),
        });
        this.chart.update();

        this.later(500, AddDummyData);
    });
};

SensorChart.prototype.bind = function (page) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    this.page = page;

>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
=======
    this.page = page;

>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
    if (page && page.m_uiSensorChart) {
        // Fit the chart into the container rectangle.. overlay..
        var px0 = page.m_uiSensorChart.localToGlobal(
            new Laya.Point(0, 0));
        var px1 = page.m_uiSensorChart.localToGlobal(
            new Laya.Point(page.m_uiSensorChart.width, page.m_uiSensorChart.height));

        this.container.style.display = "block";
        this.container.style.left    = px0.x + "px";
        this.container.style.top     = px0.y + "px";
        this.container.style.width   = (px1.x - px0.x) + "px";
        this.container.style.height  = (px1.y - px0.y) + "px";
    } else {
        // No such control, hide the chart.
        this.container.style.display = "none";
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
};

SensorChart.prototype.rebind = function () {
     // this.bind(this.page);
<<<<<<< HEAD
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
=======
>>>>>>> d2a35c038415471afa3d5ab7e6ebe05c8c091d95
};
