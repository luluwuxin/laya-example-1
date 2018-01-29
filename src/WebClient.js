"use strict";

var WebClient = (function (window, Laya, logger) {

    function WebClient() {
        this.data      = {};
        this.car_list  = this.getMockCarList();
        this.car       = JSON.parse(JSON.stringify(this.car_list[0]));
        this.scene     = {};
        this.ros       = this.getMockRosInfo();
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

            // Replace this as soon as car list is supported
            if (!this.__init_car_list) {
                this.__init_car_list = true;
                this.fire("__init_car_list");
            }

            // Init internal hard-coded settings
            this.initHardcodeData();

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
        logger.info("WebSocket receive: ");
        logger.info(json);

        // Update the model
        switch (json.method) {

        case "traffic_info":
            this.scene.traffic_info = Object.assign(this.scene.traffic_info || {}, json);
            break;

        case "car_config":
            this.car.car_config = Object.assign(this.car.car_config || {}, json);
            break;

        case "car_state":
            this.car.car_state = Object.assign(this.car.car_state || {}, json);
            break;

        case "ros_info":
            this.ros.ros_info = Object.assign(this.ros.ros_info || {}, json);
            break;

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
        logger.info("WebSocket send: ");
        logger.info(this.data[method]);
        this.socket.send(JSON.stringify(this.data[method]));

        // Refresh in case that backend doesn't push it back.
        var self = this;
        setTimeout(function() {
            self.fire(method);
        }, 1);
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

    // Save the case list.
    WebClient.prototype.storeCases = function () {
        this.socket.send(JSON.stringify(this.case.toJson()));
    };

    // Start Ros
    WebClient.prototype.startRos = function () {
        // Make a copy of the ros_info. ros_info will be pushed from the
        // backend with start=true.
        var ros_info = JSON.parse(JSON.stringify(this.ros.ros_info));

        // Always set raw_drive to be running.
        ros_info.config.forEach(function (v) {
            if (v.name === "raw_drive" || v.name === "AirSimDriver") {
                v.running = true;
            }
        });

        Object.assign(ros_info, {
            start: true,
        });

        // Push the data to the node backend.
        this.socket.send(JSON.stringify(ros_info));
    };

    // Start Sim
    WebClient.prototype.startSim = function () {
        this.socket.send(JSON.stringify({
            method: "sumo_ready",
        }));
    };

    // Start Driving
    WebClient.prototype.startDrive = function () {
        // Push the data to the node backend.
        this.socket.send(JSON.stringify(this.scene.traffic_info));
        this.socket.send(JSON.stringify(this.car.car_config));
        this.socket.send(JSON.stringify({
            method: "ready",
        }));
    };

    // Start the case
    WebClient.prototype.sendCase = function (info) {
        var data = Object.assign({
            method: "case_info",
        }, info);

        logger.info("WebSocket send: ");
        logger.info(data);

        this.socket.send(JSON.stringify(data));
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

    WebClient.prototype.getMockRosInfo = function () {
        return {
            ros_info: {
                method: "ros_info",
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
