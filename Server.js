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

	this.SceneInfo={
		method:"scene_info",
		scene:"IndistrialCity",
		path: "default"
	};

	this.WeatherInfo = {
		method:"weather_info",
		temperature:25,
		time_of_day:"9:00",
		// rain_type:"HeavyRain",
		// snow_type:"ModerateSnow",
		rain_type:true,
		snow_type:false,
		fog_type:"HeaveFog",

	};
	
	this.TrafficInfo={
		method:"traffic_info",
		car_density:50,
		pdestrain_density:19,
		car_irregularity:29
	};

	this.RosInfo = {

	};

	this.cli_web = null;
	this.cli_ros = null;
	this.cli_ue4 = null;
	this.cli_ue4_daemon = null;
	
	this.procAuth = function(socket, pack)
	{
		var type = pack.type;
        var client = logic.addClient(type, socket);

		switch(type)
		{
			case 0: //web
			this.cli_web = client;
			break;

			case 1: //ros
			this.cli_ros = client;
			break;
			
			case 2: //ue4
			this.cli_ue4 = client;
			break;

			case 3: //ue4d
			this.cli_ue4_daemon = client;
			break;
			
			default:
			break;
		}
        console.log("auth client:%d", client.cid);
        pack.cid = client.cid;
        pack.msg = "welcome!";
        client.send(pack);
	}
	
	this.procMessage = function(socket, pack)
	{
		var client = this.clients[socket];
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
				if(this.cli_ue4!=null)
					this.cli_ue4.send(pack);
				break;
			}
			
			case "weather_info":
			{
				this.WeatherInfo = pack;
				if(this.cli_ue4!=null)
					this.cli_ue4.send(pack);
				break;
			}
			
			case "traffic_info":
			{
				this.TrafficInfo = pack;
				if(this.cli_ue4!=null)
					this.cli_ue4.send(pack);
				break;
			}

			case "ros_info":
			{
				this.RosInfo = pack;
				if(this.cli_web!=null)
					this.cli_web.send(pack);
			}
			
            default:
            {
                console.log(pack.method);
                socket.send(msg); 
                break;
            }
        }

	}
	
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

	this.sendUE4Info = function()
	{
		if(this.cli_ue4!=null)
		{
			this.cli_ue4.send(this.SceneInfo);
			this.cli_ue4.send(this.WeatherInfo);
			this.cli_ue4.send(this.TrafficInfo);
		}
	}
	
}
exports.LogicServer = LogicServer;
