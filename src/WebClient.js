"use strict";

var WebClient = (function (window, Laya, logger) {

    function WebClient() {
        this.data      = {};
        this.case      = new WebClientCase();
        this.callbacks = {};
        this.init();
    }

    // Establish the connection to backend node server
    WebClient.prototype.init = function () {
        this.socket = new Laya.Socket();
        this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
        this.socket.connectByUrl("ws://" + 
                                (window.location.host || "localhost:8081"));

        // On connection established
        this.socket.on(Laya.Event.OPEN, this, function (e) {
            logger.info("WebSocket open: " + e.target.url);

            // Init internal hard-coded settings
            this.initHardcodeData();

            // Claim that this is a Web Client
            this.sendJson({
                method: "auth",
                type: 0, // Web Client
            });
        });

        // On message from remote
        this.socket.on(Laya.Event.MESSAGE, this, function (msg) {
            if (typeof msg === "string") {
                // Parse the input string into JSON object.
                var json;
                try {
                    json = JSON.parse(msg);
                } catch (err) {
                    // Only json is expected. Log and rethrow.
                    logger.error("WebSocket received invalid json: " + msg);
                    throw err;
                }

                // Handle the message from the backend server.
                this.handleJsonMessage(json);
            } else {
                // Only string data is expected.
                throw new Error("WebSocket received unsupported data.");
            }
        });

        // On connection close
        this.socket.on(Laya.Event.CLOSE, this, function (e) {
            logger.info("WebSocket close: " + e.target.url);

            // Retry after 1 second. Long live connection..
            var self = this;
            setTimeout(function() {
                self.init();
            }, 1000);
        });

        // On connection error
        this.socket.on(Laya.Event.ERROR, this, function (e) {
            // Laya ate the Error ?
            logger.error("WebSocket error: " + e.target.url);
        });
    };

    // Handle the JSON message
    WebClient.prototype.handleJsonMessage = function (json) {
        logger.info("WebSocket receive: " + json.method);
        logger.info(json);

        // Update the model
        switch (json.method) {

        case "case_list":
            this.case.init(json);
            break;

        default:
            this.data[json.method] = JSON.parse(JSON.stringify(json));
            break;
        }

        // Fire callbacks to refresh the webpage
        this.fire(json.method);
    };

    // Send the JSON message to backend.
    WebClient.prototype.send = function (method) {
        // Send to backend
        this.sendJson(this.data[method]);

        // Refresh in case that backend doesn't push it back.
        var self = this;
        setTimeout(function() {
            self.fire(method);
        }, 1);
    };

    // Wrapper for sending an object as string with logging
    WebClient.prototype.sendJson = function (json) {
        logger.info("WebSocket send: " + (json.method || ""));
        logger.info(json);
        this.socket.send(JSON.stringify(json));
    };

    // Add a callback to the client based on method.
    WebClient.prototype.on = function (method, self, handler) {
        this.callbacks[method] = this.callbacks[method] || [];
        this.callbacks[method].push({
            self: self,
            handler: handler,
        });
        return this;
    };

    // Fire callbacks based on method.
    WebClient.prototype.fire = function (method) {
        if (this.callbacks[method]) {
            this.callbacks[method].forEach(function (v) {
                v.handler.apply(v.self);
            });
        }
        return this;
    };

    // Copy the current car_config as a new preset.
    WebClient.prototype.addCarConfig = function () {
        // car_config has not been loaded yet.
        if (!this.data.car_config || !this.data.car_config_list) return;

        // Determine the name of the new preset.
        var pname  = "New Preset #";
        var pidMax = 1;
        this.data.car_config_list.list.forEach(function (p) {
            if (p.name.startsWith(pname)) {
                var pid = parseInt(p.name.substr(pname.length));
                if (pid) {
                    pidMax = pid + 1;
                }
            }
        });

        // Append to the car_config_list as a new preset.
        this.data.car_config_list.list.push({
            name: pname + pidMax,
            car_config: JSON.parse(JSON.stringify(this.data.car_config)),
        });

        // Commit
        this.send("car_config_list");
    };

    // Load the preset as the current car_config.
    WebClient.prototype.loadCarConfig = function (name) {
        // car_config has not been loaded yet.
        if (!this.data.car_config || !this.data.car_config_list) return;

        // Find and load the preset by name.
        var _this = this;
        this.data.car_config_list.list.forEach(function (p) {
            if (p.name === name) {
                _this.data.car_config = JSON.parse(JSON.stringify(p.car_config));
            }
        });

        // Commit
        this.send("car_config");
    };

    // Remove the preset by its name.
    WebClient.prototype.removeCarConfig = function (name) {
        // car_config has not been loaded yet.
        if (!this.data.car_config || !this.data.car_config_list) return;

        // Find and remove the preset by name.
        this.data.car_config_list.list = this.data.car_config_list.list.filter(function (p) {
            return p.name !== name;
        });

        // Commit
        this.send("car_config_list");
    };

    // Save the current car_config.
    WebClient.prototype.saveCarConfig = function (name) {
        // car_config has not been loaded yet.
        if (!this.data.car_config || !this.data.car_config_list) return;

        // Find and load the preset by name.
        var changed = false;
        var _this = this;
        this.data.car_config_list.list.forEach(function (p) {
            if (p.name === name) {
                p.car_config = JSON.parse(JSON.stringify(_this.data.car_config));
                changed = true;
            }
        });

        // Commit
        if (changed) {
            this.send("car_config_list");
        }
    };

    // Rename the car_config.
    WebClient.prototype.renameCarConfig = function (oldName, newName) {
        // car_config has not been loaded yet.
        if (!this.data.car_config || !this.data.car_config_list) return oldName;

        // Check if the name conflicts.
        var conflict = false;
        this.data.car_config_list.list.forEach(function (p) {
            if (p.name === newName) {
                conflict = true;
            }
        });
        if (conflict) {
            this.fire("car_config_list");
            return oldName;
        }

        // Find and rename the preset by name.
        var _this = this;
        this.data.car_config_list.list.forEach(function (p) {
            if (p.name === oldName) {
                p.name = newName;
            }
        });

        // Commit
        this.send("car_config_list");
        return newName;
    };

    // Add a sensor.
    WebClient.prototype.addSensor = function (sensor) {
        // car_config has not been loaded yet.
        if (!this.data.car_config) return;

        // Look for the next available sensor id.
        var sidMax = -1;
        this.data.car_config.config.forEach(function (v) {
            sidMax = Math.max(sidMax, v.sid);
        });
        sensor.sid = sidMax + 1;

        // Add to the sensor list.
        this.data.car_config.config.push(sensor);

        // Commit
        this.send("car_config");
    };

    // Remove a sensor.
    WebClient.prototype.removeSensor = function (sid) {
        // car_config has not been loaded yet.
        if (!this.data.car_config) return;

        // Remove the sensor with the specified sid
        this.data.car_config.config = this.data.car_config.config.filter(function (v) {
            return v.sid !== sid;
        });

        // Commit
        this.send("car_config");
    };

    // Save the case list.
    WebClient.prototype.storeCases = function () {
        this.sendJson(this.case.toJson());
    };

    // Stop, Start or Pause Ros
    WebClient.prototype.sendRosInfo = function (status) {
        // Make a copy of the ros_info. ros_info will be pushed from the
        // backend with the actual status.
        var ros_info = JSON.parse(JSON.stringify(this.data.ros_info));

        // Always set raw_drive to be running.
        ros_info.config.forEach(function (v) {
            if (v.name === "raw_drive" || v.name === "AirSimDriver") {
                v.running = true;
            }
        });

        Object.assign(ros_info, {
            status: status,
        });

        // Push the data to the node backend.
        this.sendJson(ros_info);
    };

    // Stop, Start or Pause Sumo
    WebClient.prototype.sendSumoInfo = function (status) {
        this.sendJson({
            method: "sumo_info",
            status: status,
        });
    };

    // Stop, Start or Pause Driving
    WebClient.prototype.sendDriveInfo = function (status) {
        this.sendJson({
            method: "drive_info",
            status: status,
        });
    };

    // Start the case
    WebClient.prototype.sendCase = function (info) {
        this.sendJson(Object.assign({
            method: "case_info",
        }, info));
    };

    // Hard-code stuff
    WebClient.prototype.initHardcodeData = function () {
        this.handleJsonMessage({
            method: "scene_list",
            data: [
                {
                    scene: "IndustrialCity",
                    image: "custom/image_scene_IndustrialCity.png",
                },
                {
                    scene: "ShengBangJie",
                    image: "custom/image_scene_ShengBangJie.png",
                },
                {
                    scene: "Shanghai",
                    image: "custom/image_scene_Shanghai.png",
                },
                {
                    scene: "Parking",
                    image: "custom/image_scene_Parking.png",
                },
            ]
        })
    };

    return WebClient;
}(window, Laya, console));
