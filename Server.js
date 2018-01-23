const cli = require("./Client.js");

function LogicServer()
{
    this.clients = new Object();
    this.cids = new Object();
    this.cid_seed = 0;

	//method:scene_info
	//method:weather_info
	//method:car_info
	// var CaseInfo = {
	// scene:"IndistrialCity",	path: "default",
	
	// weather: {
	// temperature:25,
	// time_of_day:"9:00",
	// rain_type:"HeavyRain",
	// snow_type:"ModerateSnow",
	// fog_type:"HeaveFog",
	// },
	
	// traffic:{car_density:50, pdestrain_density:19, car_irregularity:29}
	// };
	
    this.genCid = function()
    {
        return ++this.cid_seed;
    }

    this.isAuth = function(cid_or_socket)
    {
        return this.clients[cid_or_socket]!=null;
    }

    this.cid2socket = function(cid)
    {
        var client = this.clients[cid];
        if(info==null)
            return null;
        return client.socket;
    }

    this.socket2cid = function(socket)
    {
        var client = this.clients[socket];
        if(client==null)
            return null;
        return client.cid;
    }

    /*
      this.nid2socket = function(nid)
      {
      return 1;
      }

      this.nid2cid = function(nid)
      {
      return 1;
      }*/

    this.addClient = function(type, socket)
    {
        var client = this.clients[socket];
        if(client==null)
        {
            var cid = this.genCid();
            client = cli.create(type, cid, socket);
            this.clients[cid]= this.clients[socket]= client;
            this.cids[cid]=cid;
        } 
        return client;
    }

    this.removeSocket = function(socket)
    {
        var client = this.clients[socket];
        if(client!=null)
        {
            var cid = client.cid;
            delete this.clients[cid];
            delete this.clients[socket];
            delete this.cids[cid];
        }
    }

    this.removeClient = function(cid)
    {
        var client = this.clients[cid];
        if(client!=null)
        {
            var socket = client.socket;
            delete this.clients[cid];
            delete this.clients[socket];
        }
    }
    /*
      this.addNode = function(nid, obj)
      {
      }
      this.removeNode = function(nid)
      {
      }*/

    this.send2Client = function(cid, msg)
    {
        //if(msg instanceof String)
        //{
        //    msg = JSON.parse(msg);
        //}
        var client = this.clients[cid];
        if(client!=null)
        {
            client.send(msg);
        }
    }

    this.send2Socket = function(socket, msg)
    {
        var client = this.clients[socket];
        if(client!=null)
        {
            client.send(msg);
        }
    }

    /*
      this.send2Node = function(nid, msg)
      {
      if(msg instanceof String)
      {
      msg = JSON.parse(msg);
      }
      }*/

    this.broadcast = function(msg, except)
    {
        for(var cid in this.cids)
        {
            var client = this.clients[cid];
            if(client!=except)
                client.send(msg);
        }
    }

	///////////////////////////////////
	this.SceneInfo={
		method:"scene_info",
		scene:"IndustrialCity",
		path: "default"
	};

	this.WeatherInfo = {
		method:"weather_info",
		temperature:25,
		time_of_day:950,
		// rain_type:"HeavyRain",
		// snow_type:"ModerateSnow",
		rain_type:false,
		snow_type:true,
		fog_type:"HeaveFog",

	};
	
	this.TrafficInfo={
		method:"traffic_info",
		car_density:50,
		pedestrain_density:19,
		car_irregularity:29
	};

	// 0:PointCloud 1:Image 2:IMU 3:GPS
	this.RosInfo = {
		method:"ros_status",
		start:false,
		config:[
			{sid:1, type:0, name:"raw_point", running:false},
			{sid:2, type:1, name:"raw_image", running:false},
			{sid:3, type:2, name:"raw_gps", running:false},
			{sid:4, type:3, name:"raw_imu", running:false}
		]
	};

	// 0:摄像头 1:激光雷达 2:毫米波雷达
	//roll:单位degree,范围 0~360
	//pitch:单位degree,范围 -90~90
	//yaw:单位degree,范围 0~360
	
	this.CarConfig = {
		method:"car_config",
		config:[
			{sid:1, type:1,x:0,y:20,z:200.0,roll:0,pitch:0,yaw:0},
			{sid:2, type:2,x:0,y:55.0,z:200.0,roll:0,pitch:0,yaw:0,
			 params:
			 {
				 LongRangeAzimuthFieldOfView:20.0,
				 MidRangeAzimuthFieldOfView:90.0,
				 VerticalFieldOfView:5.0,
				 MinRange:100.0,
				 LongRangeMaxRange:10000.0,
				 MidRangeMaxRange:5000.0,
				 MinRangeRate:-10000.0,
				 MaxRangeRate:10000.0,
				 LongRangeAzimuthResolution:4.0,
				 MidRangeAzimuthResolution:12.0,
				 VerticalResolution:10.0,
				 LongRangeRangeResolution:250.0,
				 MidRangeRangeResolution:125.0,
				 RangeRateResolution:50.0,
				 MaxNumDetections:64,
				 UseMidRange:true
			 }
			},
			{sid:3, type:0,x:188.0,y:0.0,z:110.0,roll:0,pitch:0,yaw:0,fov:45,
			 params:
			 {
				 ResolutionWidth:1024,
				 ResolutionHeight:768
			 }
			},
			{sid:4, type:0,x:193.0,y:-55.0,z:103.0,roll:0,pitch:0,yaw:0, 
			 params:
			 {
				 fov:60,ResolutionWidth:1920,ResolutionHeight:1024
			 }
			},
			{sid:5, type:0,x:188.0,y:55.0,z:103.0,roll:0,pitch:0,yaw:0,
			 params:
			 {
				 fov:90,ResolutionWidth:2560,ResolutionHeight:1440
			 }
			}
		]
	};
	
	this.CarState = {method:"car_state",
					 speed:18.093740463256836,accer:-0.34551405906677246,steer:-1};
	this.cli_web = null;
	this.cli_ros = null;
	this.cli_ue4 = null;
	this.cli_ue4_daemon = null;

	this.send2web = function(pack)
	{
		if(this.cli_web!=null)
			this.cli_web.send(pack);
	}

	this.send2ros = function(pack)
	{
		if(this.cli_ros!=null)
			this.cli_ros.send(pack);
	}

	this.send2ue4 = function(pack)
	{
		if(this.cli_ue4!=null)
			this.cli_ue4.send(pack);
	}

	this.send2ue4d = function(pack)
	{
		if(this.cli_ue4_daemon!=null)
			this.cli_ue4_daemon.send(pack);
	}

	////////////////////////////////////////////////////////////////////
	this.procAuth = function(socket, pack)
	{
		var type = pack.type;
        var client = this.addClient(type, socket);
		console.log('receivedAuth: %s:%s', client.getInfo(), JSON.stringify(pack));
		switch(type)
		{
			case 0: //web
			this.cli_web = client;
			this.cli_web.send(this.SceneInfo);
			this.cli_web.send(this.WeatherInfo);
			this.cli_web.send(this.TrafficInfo);
			this.cli_web.send(this.CarConfig);
			this.cli_web.send(this.RosInfo);
			break;

			case 1: //ros
			this.cli_ros = client;
			break;
			
			case 2: //ue4
			this.cli_ue4 = client;
			this.cli_ue4.send(this.SceneInfo);
			// this.cli_ue4.send(this.WeatherInfo);
			// this.cli_ue4.send(this.TrafficInfo);
			// this.cli_ue4.send(this.Carclient);
			// this.push_ue4_config();
			break;

			case 3: //ue4d
			this.cli_ue4_daemon = client;
			break;
			
			default:
			break;
		}
        console.log("auth client %d:%s", client.cid, client.getInfo());
        pack.cid = client.cid;
        pack.msg = "welcome!";
        client.send(pack);
	}
	
	this.procMessage = function(socket, pack)
	{
		var client = this.clients[socket];
		console.log('receivedPack: %s:!!!%s!!!', client.getInfo(), pack.method);
		switch(pack.method)
        {
            case "chat":
            {
                this.broadcast(pack);
                break;
            }
			case "scene_info":
			{
				this.SceneInfo = pack;
				this.send2ue4(pack);
				break;
			}
			
			case "weather_info":
			{
				this.WeatherInfo = pack;
				this.send2ue4(pack);
				break;
			}
			
			case "traffic_info":
			{
				this.TrafficInfo = pack;
				this.send2ue4(pack);
				break;
			}

			case "ros_info":
			{
				this.RosInfo = pack;
				if(this.cli_web!=null)
					this.cli_web.send(pack);
				break;
			}

			case "car_config":
			{
				this.CarConfig = pack;
				this.send2ue4(pack);
				break;
			}

			case "loading":
			{
				this.cli_ue4.send(this.WeatherInfo);
				this.cli_ue4.send(this.TrafficInfo);
				this.cli_ue4.send(this.CarConfig);
				break;
			}

			case "car_state":
			{
				this.car_state = pack;
				this.cli_web.send(this.car_state);
				break;
			}

			case "run":
			{
				break;
			}

            default:
            {
                console.log(pack.method);
                client.send(pack); 
                break;
            }
        }

	}

	this.push_ue4_config = function()
	{
		this.send2ue4(this.SceneInfo);
		this.send2ue4(this.WeatherInfo);
		this.send2ue4(this.TrafficInfo);
		this.send2ue4(this.CarConfig);
	}
	
}
exports.LogicServer = LogicServer;
