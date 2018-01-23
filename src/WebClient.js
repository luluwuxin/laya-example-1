"use strict";

var WebClient = (function (window, Laya, logger) {

    function WebClient() {
        this.car_list   = this.getMockCarList();
        this.car        = JSON.parse(JSON.stringify(this.car_list[0]));
        this.scene_list = this.getMockSceneList();
        this.scene      = JSON.parse(JSON.stringify(this.scene_list[0]));
        this.ros        = this.getMockRosInfo();
        this.callbacks  = {};
        this.init();
    }

    // Establish the connection to backend node server
    WebClient.prototype.init = function () {
        this.socket = new Laya.Socket();
        this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
        this.socket.connectByUrl("ws://" + 
                                (window.location.host || "10.2.10.215") +
                                ":8080");

        // On connection established
        this.socket.on(Laya.Event.OPEN, this, function (e) {
            logger.info("WebSocket open: " + e.target.url);

            // Replace this as soon as car/scene list is supported
            if (!this.__init_scene_list) {
                this.__init_scene_list = true;
                this.fire("__init_scene_list");
            }
            if (!this.__init_car_list) {
                this.__init_car_list = true;
                this.fire("__init_car_list");
            }

            // Claim that this is a Web Client
            this.socket.send(JSON.stringify({
                method: "auth",
                type: 0, // Web Client
            }));
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
        });

        // On connection error
        this.socket.on(Laya.Event.ERROR, this, function (e) {
            // Laya ate the Error ?
            logger.error("WebSocket error: " + e.target.url);
        });
    };

    // Handle the JSON message
    WebClient.prototype.handleJsonMessage = function (json) {
        logger.info("WebSocket receive: ");
        logger.info(json);

        // Update the model
        switch (json.method) {

        case "scene_info":
            // Only one scene for now. Shouldn't the user choose a scene in browser?
            Object.assign(this.scene.scene_info, json);
            break;

        case "weather_info":
            Object.assign(this.scene.weather_info, json);
            break;

        case "traffic_info":
            Object.assign(this.scene.traffic_info, json);
            break;

        case "car_config":
            Object.assign(this.car.car_config, json);
            break;

        case "ros_status":
            Object.assign(this.ros.ros_status, json);
            break;

        case "car_state":
            Object.assign(this.car.car_state, json);
            break;
        }

        // Fire callbacks to refresh the webpage
        this.fire(json.method);
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

    // Add a sensor.
    WebClient.prototype.addSensor = function (sensor) {
        // car_config has not been loaded yet.
        if (!this.car) return;

        // Look for the next available sensor id.
        var sidMax = -1;
        this.car.car_config.config.forEach(function (v) {
            sidMax = Math.max(sidMax, v.sid);
        });
        sensor.sid = sidMax + 1;

        // Add to the sensor list.
        this.car.car_config.config.push(sensor);

        // Fire
        this.fire("car_config");
    };

    // Remove a sensor.
    WebClient.prototype.removeSensor = function (sid) {
        // car_config has not been loaded yet.
        if (!this.car) return;

        // Remove the sensor with the specified sid
        this.car.car_config.config = this.car.car_config.config.filter(function (v) {
            return v.sid !== sid;
        });

        // Fire
        this.fire("car_config");
    };

    // Choose a scene from the list.
    WebClient.prototype.chooseScene = function (i) {
        if (typeof i !== "number" || i < 0 || i >= this.scene_list.length) {
            throw new Error("Invalid scene index: " + i);
        }

        // Discard the current scene settings.
        this.scene = JSON.parse(JSON.stringify(this.scene_list[i]));

        // Fire
        this.fire("scene_info")
            .fire("weather_info")
            .fire("traffic_info");
    };

    // Start Ros
    WebClient.prototype.startRos = function () {
        // Make a copy of the ros_status. ros_status will be pushed from the
        // backend with start=true.
        var ros_status = JSON.parse(JSON.stringify(this.ros.ros_status));

        Object.assign(ros_status, {
            start: true,
        });

        // Push the data to the node backend.
        this.socket.send(JSON.stringify(ros_status));
    };

    // Start Sim
    WebClient.prototype.startSim = function () {
        //
    };

    // Start Driving
    WebClient.prototype.startDrive = function () {
        // Push the data to the node backend.
        this.socket.send(JSON.stringify(this.scene.scene_info));
        this.socket.send(JSON.stringify(this.scene.weather_info));
        this.socket.send(JSON.stringify(this.scene.traffic_info));
        this.socket.send(JSON.stringify(this.car.car_config));
    };

    // Return a mock car config list for testing
    WebClient.prototype.getMockCarList = function () {
        return [
            {
                car_config: {
                    method: "car_config",
                    config: [
                        {sid:0,type:0,x:188,y:0,z:110,roll:0,pitch:0,yaw:0},
                        {sid:1,type:1,x:1,y:20,z:0,roll:0,pitch:0,yaw:0},
                        {sid:2,type:2,x:0,y:10,z:0,roll:0,pitch:0,yaw:0},
                    ],
                },
                car_state: {
                    method: "car_state",
                    speed: 18.093740463256836,
                    accer: -0.34551405906677246,
                    steer: -1,
                },
            },
        ];
    };

    // Return a mock scene for testing.
    WebClient.prototype.getMockSceneList = function () {
        return [
            {
                scene_info: {
                    method: "scene_info",
                    scene: "IndistrialCity",
                    path: "default",
                },
                weather_info: {
                    method: "weather_info",
                    temperature: 25,
                    time_of_day: "9:00",
                    rain_type: true,
                    snow_type: false,
                    fog_type: "HeaveFog",
                },
                traffic_info: {
                    method: "traffic_info",
                    car_density: 50,
                    pedestrain_density: 19,
                    car_irregularity: 29,
                },
            },
            {
                scene_info: {
                    method: "scene_info",
                    scene: "Changning",
                    path: "default",
                },
                weather_info: {
                    method: "weather_info",
                    temperature: -10,
                    time_of_day: "19:00",
                    rain_type: false,
                    snow_type: true,
                    fog_type: "",
                },
                traffic_info: {
                    method: "traffic_info",
                    car_density: 500,
                    pedestrain_density: 109,
                    car_irregularity: 209,
                },
            },
        ];
    };

    WebClient.prototype.getMockRosInfo = function () {
        return {
            ros_status: {
                method: "ros_status",
                config: [
                    { sid: 1, type: 0, name: "raw_point", running: false },
                    { sid: 2, type: 1, name: "raw_image", running: false },
                    { sid: 3, type: 2, name: "raw_gps", running: false },
                    { sid: 4, type: 3, name: "raw_imu", running: false },
                ],
            },
        };
    };

    return WebClient;
}(window, Laya, console));
