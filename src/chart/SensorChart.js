"use strict";

// Chart graph for visualizing ROS sensor data.
function SensorChart(client) {
    SensorChart.super(this);

    // Buffer for the topic_info objects. They are consumed in
    // onRefresh callback, which is called at regular interval.
    this.buffer = [];

    // Init after Laya create the stage div element.
    this.later(1, function () {
        this.init();
        this.client = client
          .on("ros_info", this, function () {
              this.initChartData();
          })
          .on("topic_info", this, function () {
              this.refreshChartData();
          });
    });
}
Laya.class(SensorChart, "SensorChart", Laya.EventDispatcher);

SensorChart.prototype.show = function (value) {
    // Not initialized ?
    if (!this.container) {
        return;
    }

    if (value === undefined) {
        value = true;
    }
    this.container.style.display = value ? "block" : "none";
};

SensorChart.prototype.hide = function () {
    this.show(false);
};

SensorChart.prototype.foreground = function (value) {
    // Not initialized ?
    if (!this.container) {
        return;
    }

    if (value === undefined) {
        value = true;
    }
    this.container.style.zIndex = value ? 30000 : -30000;
};

SensorChart.prototype.background = function () {
    this.foreground(false);
};

SensorChart.prototype.later = function (time, handler) {
    // Call handler after time milliseconds. Mostly used to reschedule handler to event loop.
    var _this = this;
    setTimeout(function() {
        handler.apply(_this);
    }, time);
};

SensorChart.prototype.getColor = function (name) {
    function hashCode(s) {
        var h = 0, l = s.length, i = 0;
        if (l > 0) {
            while (i < l) {
                h = (h << 5) - h + s.charCodeAt(i++) | 0;
            }
        }
        return h;
    }

    var hash = hashCode(name);
    var r = (hash & 0xFF0000) >> 16;
    var g = (hash & 0x00FF00) >> 8;
    var b = (hash & 0x0000FF);

    return "rgb(" + r + ", " + g + ", " + b + ")";
};

SensorChart.prototype.init = function () {
    var _this = this;

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

        // Handle resize. Must wait for Laya to finish resizing..
        var resizeTimeout;
        window.addEventListener("resize", function () {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(function() {
                    resizeTimeout = null;
                    _this.rebind();
                }, 1000);
            }
        }, false);
    }
    this.container = container;

    // Init chartjs and its canvas.
    if (!this.chart) {
        var canvas = document.createElement("canvas");
        container.appendChild(canvas);

        // ChartJS creation here.
        this.chart = new Chart(canvas, {
            type: "line",
            data: {},
            options: {
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
                            type: "realtime",
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Time",
                            },
                            time: {
                                unit: "second",
                                displayFormats: {
                                    second: "mm:ss",
                                },
                            },
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Value",
                            },
                        },
                    ],
                },
                plugins: {
                    streaming: {
                        duration: 60000,
                        delay: 1000,
                        onRefresh: function (chart) {
                            _this.consumeChartData(chart);
                        },
                    },
                },
            },
        });
    }
};

SensorChart.prototype.bind = function (page) {
    // Not initialized ?
    if (!this.container) {
        return;
    }

    // Save the page for rebind()..
    this.page = page;

    if (page && page.m_uiSensorChart) {
        // Fit the chart into the container rectangle.. overlay..
        var px0 = page.m_uiSensorChart.localToGlobal(
            new Laya.Point(0, 0));
        var px1 = page.m_uiSensorChart.localToGlobal(
            new Laya.Point(page.m_uiSensorChart.width, page.m_uiSensorChart.height));
        var sx = Laya.Browser.clientWidth / Laya.stage.width;
        var sy = Laya.Browser.clientHeight / Laya.stage.height;

        this.show();
        this.container.style.left    = (px0.x * sx) + "px";
        this.container.style.top     = (px0.y * sy) + "px";
        this.container.style.width   = ((px1.x - px0.x) * sx) + "px";
        this.container.style.height  = ((px1.y - px0.y) * sy) + "px";
    } else {
        // No such control, hide the chart.
        this.hide();
    }
};

SensorChart.prototype.rebind = function () {
     this.bind(this.page);
};

SensorChart.prototype.initChartData = function () {
    // No data ?
    if (!this.client.data.ros_info) {
        return;
    }

    // Init the chartjs data object.
    var data = {
        labels: [],
        datasets: [],
    };

    // Add lines.
    var _this = this;
    this.client.data.ros_info.config.forEach(function (v) {
        if (v.name === "raw_drive" || v.name === "AirSimDriver") return;

        // Add the new dataset.
        data.datasets.push({
            label: v.name,
            backgroundColor: _this.getColor(v.name),
            borderColor: _this.getColor(v.name),
            data: [],
            fill: false,
        });
    });

    var changed = false;
    if (this.chart.data && this.chart.data.datasets &&
        this.chart.data.datasets.length === data.datasets.length) {
        this.chart.data.datasets.forEach(function (v, i) {
            if (v.label !== data.datasets[i].label) {
                changed = true;
            }
        });
        if (!changed) {
            return;
        }
    }

    // Update the chart.
    this.chart.data = data;
    this.chart.update();
};

SensorChart.prototype.refreshChartData = function () {
    // No data ?
    if (!this.client.data.ros_info || !this.client.data.topic_info) {
        return;
    }

    // Chart has not been initialized.. dropping..
    if (!this.chart) {
        return;
    }

    // Chart is initialized but the ros_info was dropped..
    if (!this.chart.data.datasets || this.chart.data.datasets.length === 0) {
        this.initChartData(); // lazy
    }

    // Buffer the data objects.
    this.buffer.push({
        timestamp: new Date(),
        topic_info: JSON.parse(JSON.stringify(this.client.data.topic_info)),
    });

    // Fixed buffer window size.
    while (this.buffer.length > 10000) {
        this.buffer.shift();
    }
};

SensorChart.prototype.consumeChartData = function (chart) {
    chart = chart || this.chart;

    // Consume the data object in the buffer one by one.
    this.buffer.forEach(function (dataInBuffer) {
        dataInBuffer.topic_info.hz_info.forEach(function (v, i) {
            var dataset = chart.data.datasets[i];
            if (dataset) {
                dataset.data.push({
                    x: dataInBuffer.timestamp,
                    y: v,
                });
            }
        });
    });
    this.buffer.length = 0;
};
