'use strict';

// function Sensor(nid, type)
// {
    // this.nid = nid;
    // this.type = 0;// 0:camera 1:lidar 2:radar 3:GPS 4:IMU
    
// }

function Client(cid,cli)
{
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
			console.log("sent:%s->%s", this.socket.remoteAddress, msg);
		}catch(err)
		{
			console.log("sent:"+this.socket.remoteAddress+" err:"+err);
			// this.send(msg);
		}
    }

	this.getInfo = function()
	{
		return this.socket.remoteAddress;
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
