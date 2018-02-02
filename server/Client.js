'use strict';

// function Sensor(nid, type)
// {
    // this.nid = nid;
    // this.type = 0;// 0:camera 1:lidar 2:radar 3:GPS 4:IMU
    
// }

function Client(cid,cli)
{
	this.type = -1;
    this.cid = cid;
    this.socket = cli;
	this.remoteAddress = cli.remoteAddress;
    this.send = function(msg)
    {
        //if(msg instanceof String)
        //{
        //    msg = JSON.parse(msg);
        //}

        if(msg instanceof Object)
        {
            msg = JSON.stringify(msg);
        }
		
		try
		{
			this.socket.send(msg);
			console.log("sent:%d %s->%s", this.type, this.socket.remoteAddress, msg);
		}catch(err)
		{
			console.log("xxx----sent:"+this.socket.remoteAddress+" err:"+err + " msg:" + msg + " type:" + this.type);
			this.logic.removeSocket(this.socket);
		}
    }

	this.getInfo = function()
	{
		return this.socket.remoteAddress;
	}

	this.isWeb = function()
	{
		return this.type == 0;
	}

	this.isRos = function()
	{
		return this.type == 1;
	}

	this.isUE4 = function()
	{
		return this.type == 2;
	}

	this.isUE4d = function()
	{
		return this.type == 3;
	}

	this.isTopic = function()
	{
		return this.type == 4;
	}
}
/*
  function WebClient(cid,socket)
  {
  Client.call(this, cid, socket);
  }

  function RosClient(cid,socket)
  {
  Client.call(this, cid, socket);

  this.cameras = new Array();
  this.lidars=new Array();
  this.radars=new Array();
  }

  function CarClient(cid,socket)
  {
  Client.call(this, cid, socket);
  }

  function create(type, cid, socket)
  {
  switch(type)
  {
  case 0:
  return new WebClient(cid, socket);
  case 1:
  return new RosClient(cid, socket);
  case 2:
  return new CarClient(cid, socket);
  default:
  return new Client(cid, socket);
  }

  }*/

function create(type, cid, socket)
{
	var cli =  new Client(cid, socket); //sdsdsdfsdf
	cli.type = type;
	return cli;
}
exports.create = create;
