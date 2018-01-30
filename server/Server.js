// Server.js --- This is where you apply your OCD.
//
// Copyright (C) 2018 Damon Kwok
//
// Author: damon <damon-kwok@outlook.com>
// Date: 2018-01-30
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
//Code:
'use strict';

const cli = require("./Client.js");
const data = require("./Data.js");
const FileHelper = require("./Helper.js");

function LogicServer()
{
    this.clients = {};
    this.cids = {};
    this.cid_seed = 0;

	this.cli_web = null; //0
	this.cli_ros = null; //1
	this.cli_ue4 = null; //2
	this.cli_ue4d = null;//3
	this.cli_topic=null; //4
	
	data.load(this);
	
    this.genCid = function()
    {
		this.cid_seed = this.cid_seed+1;
        return this.cid_seed;
    }

    this.isAuth = function(socket)
    {
		return socket.auth!=undefined;
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
        var client = socket.client;//socket.client;
        if(client==null)
            return null;
        return client.cid;
    }

    this.addClient = function(type, socket)
    {
		client.type = type;
		
		if(socket.auth)
		{
			// console.log("xxxxxxxxxxxx !!!!!!!!!!!!!!!-----------!!!!!!!!!!!!!");
			var client = socket.client;
			return client;
		}

		socket.auth=true;
        var cid = this.genCid();
        var client = cli.create(type, cid, socket);
		
		console.log("$$$$$$$$$ cid:"+cid);
        this.clients[cid]= client;
		socket.client = client;
		socket.cid = cid;
		// socket.client= client;			
        this.cids[cid]=cid;

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
			this.cli_ue4d = client;
			break;

			case 4://topic
			this.cli_topic = client;
			break;
			
			default:
			break;
		}
		return client;
    }

    this.removeSocket = function(socket)
    {
        var client = socket.client;
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
            // delete this.clients[socket];
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
            // delete this.clients[socket];
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
        var client = socket.client;
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

	this.send2topic = function(pack)
	{
		if(this.cli_topic!=null)
			this.cli_topic.send(pack);
	}

	////////////////////////////////////////////////////////////////////
	this.procAuth = function(socket, pack)
	{
		var type = pack.type;
        var client = this.addClient(type, socket);
		// console.log('receivedAuth: %s:%s', client.getInfo(), JSON.stringify(pack));

		console.log("============>auth %d | %s | %s", client.cid, client.remoteAddress, JSON.stringify(pack));
        pack.cid = client.cid;
        pack.msg = "welcome!";
        client.send(pack);
		
		switch(type)
		{
			case 0: //web
			this.send2web(this.SceneInfo);
			this.send2web(this.WeatherInfo);
			this.send2web(this.TrafficInfo);
			this.send2web(this.CarConfig);
			this.send2web(this.RosInfo);
			this.send2web(this.CaseList);
			// this.send2web(this.CaseInfo);
			break;

			case 1: //ros
			if(this.cli_ue4!=null)
			{
				ip = {method:"set_ue4_ip", ip:this.cli_ue4.remoteAddress};
				this.send2ros(ip);
				break;
			}
			
			case 2: //ue4
			{
				this.send2ue4(this.SceneInfo);
				var ip = {method:"set_ue4_ip", ip:socket.remoteAddress};
				this.send2ros(ip);
				break;
			}
			
			case 3: //ue4d
			break;

			case 4://topic
			break;
			
			default:
			break;
		}
	}
	
	this.procMessage = function(socket, pack)
	{
		var client = socket.client;
		console.log('receivedPack: %s:!!!%s!!!', client.remoteAddress, JSON.stringify(pack));
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
				FileHelper.saveJSONToFile("config/SceneInfo", pack);
				this.send2ue4(pack);
				break;
			}
			
			case "weather_info":
			{
				this.WeatherInfo = pack;
								FileHelper.saveJSONToFile("config/WeatherInfo", pack);
				this.send2ue4(pack);
				break;
			}
			
			case "traffic_info":
			{
				this.TrafficInfo = pack;
				FileHelper.saveJSONToFile("config/TrafficInfo", pack);
				this.send2ue4(pack);
				break;
			}

			case "ros_info":
			{
				this.RosInfo = pack;
				if(client == this.cli_web)
				{

					if(this.cli_ue4!=null)
					{
						pack.ip = this.cli_ue4.remoteAddress;
					}
					else if(pack.start)
					{
						pack.ip = "";
						pack.start = false;
					}
					
					this.send2ros(pack);
				}
				else if(client == this.cli_ros)
				{
					
					this.send2web(pack);
				}
				break;
			}

			case "car_config":
			{
				this.CarConfig = pack;
				FileHelper.saveJSONToFile("config/CarConfig", pack);
				this.send2ue4(pack);
				break;
			}

			case "loading":
			{
				this.send2web(pack);//
				
				this.send2ue4(this.WeatherInfo);
				this.send2ue4(this.TrafficInfo);
				this.send2ue4(this.CarConfig);
				this.send2ue4(this.CaseList);
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
				this.CaseList = pack;
				FileHelper.saveJSONToFile("config/CaseList", pack);
				
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

			
			case "sumo_info"://"sumo_ready":
			{
				if(client == this.cli_web)
					this.send2ue4(pack);
				else if(client == this.cli_ue4)
					this.send2web(pack);
				break;
			}
			
			case "drive_info"://"ready":
			{
				if(client == this.cli_ros)
					this.send2web(pack);
				else if(client == this.cli_web)
					this.send2ros(pack);
				break;
			}

			case "get":
			{
				pack.value = FileHelper.loadStringFromFile(pack.key);
				client.send(pack);
				break;
			}

			case "set":
			{
				FileHelper.saveStringToFile('db/'+pack.key, pack.value);
				break;
			}
			
			case "ping":
			{
				break;
			}

            default:
            {
                console.log("|||||||||||||||unknow pack:%s", pack.method);
                break;
            }
        }

	}

	// this.push_ue4_config = function()
	// {
		// this.send2ue4(this.SceneInfo);
		// this.send2ue4(this.WeatherInfo);
		// this.send2ue4(this.TrafficInfo);
		// this.send2ue4(this.CarConfig);
	// }
	
}
exports.LogicServer = LogicServer;
