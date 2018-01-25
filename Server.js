const cli = require("./Client.js");

function LogicServer()
{
    this.clients = new Object();
    this.cids = new Object();
    this.cid_seed = 0;
	this.ue4ip = ""

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
			if(this.cli_web == socket)
				this.cli_web = null;

			if(this.cli_ros == socket)
				this.cli_ros = null;
			
			if(this.cli_ue4 == socket)
				this.cli_ue4 = null;

			if(this.cli_ue4d == socket)
				this.cli_ue4d = null;

			if(this.cli_topic == socket)
				this.cli_topic = null;
			
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

    this.send2Client = function(cid, msg)
    {
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
	this.cli_web = null; //0
	this.cli_ros = null; //1
	this.cli_ue4 = null; //2
	this.cli_ue4d = null;//3
	this.cli_topic=null; //4
	
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
		if(this.cli_ue4d!=null)
			this.cli_ue4d.send(pack);
	}

	////////////////////////////////////////////////////////////////////
	this.procAuth = function(socket, pack)
	{
		var type = pack.type;
        var client = this.addClient(type, socket);
		// console.log('receivedAuth: %s:%s', client.getInfo(), JSON.stringify(pack));

		console.log("============>auth client %d:%s", client.cid, client.getInfo());
        pack.cid = client.cid;
        pack.msg = "welcome!";
        client.send(pack);
		
		switch(type)
		{
			case 0: //web
			this.cli_web = client;
			this.send2web(this.SceneInfo);
			this.send2web(this.WeatherInfo);
			this.send2web(this.TrafficInfo);
			this.send2web(this.CarConfig);
			this.send2web(this.RosInfo);
			this.send2web(this.CaseListInfo);
			this.send2web(this.CaseInfo);
			break;

			case 1: //ros
			this.cli_ros = client;
			if(this.ue4ip!="")
			{
				ip_pack = {method:"set_ue4_ip", ip:this.ue4ip};
				this.send2ros(ip_pack);
			}
			break;
			
			case 2: //ue4
			this.cli_ue4 = client;
			this.send2ue4(this.SceneInfo);

			this.ue4ip = this.cli_ue4.remoteAddress;
			ip_pack = {method:"set_ue4_ip", ip:this.ue4ip};
			this.send2ros(ip_pack);
			
			break;

			case 3: //ue4d
			this.cli_ue4d = client;
			break;

			case 4://topic
			this.cli_topic = client;
			break;
			
			default:
			break;
		}
	}
	
	this.procMessage = function(socket, pack)
	{
		var client = this.clients[socket];
		console.log('receivedPack: %s:!!!%s!!!', client.getInfo(), JSON.stringify(pack));
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
					this.send2web(pack);
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
				this.send2ue4(this.WeatherInfo);
				this.send2ue4(this.TrafficInfo);
				this.send2ue4(this.CarConfig);
				this.sen2ue4(this.CaseListInfo);
				this.send2ue4(this.CaseInfo);
				break;
			}

			case "car_state":
			{
				this.CarState = pack;
				if(client == this.cli_web)
					this.send2ue4(this.CarState);
				else if(client == this.cli_ue4)
					this.send2web(this.CarState);
				break;
			}

			case "case_list":
			{
				this.CaseListInfo = pack;
				
				if(client == this.cli_web)
					this.send2ue4(pack);
				else if(client == this.cli_ue4)
					this.send2web(pack);
				break;
			}
			case "case_info":
			{
				this.CaseInfo = pack;
				
				if(client == this.cli_web)
					this.send2ue4(pack);
				else if(client == this.cli_ue4)
					this.send2web(pack);
				break;
			}
			case "sumo_ready":
			{
				if(client == this.cli_web)
					this.send2ue4(pack);
				else if(client == this.cli_ue4)
					this.send2web(pack);
				break;
			}
			
			case "ready":
			{
				this.send2ros(pack);
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
