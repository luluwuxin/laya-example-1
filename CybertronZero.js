// server.js --- This is where you apply your OCD.
//
// Copyright (C) 2018 Damon Kwok
//
// Author: qq563 <damon-kwok@outlook.com>
// Date: 2018-01-09
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
// function main()
// {printf("hello,world");
// }

// var express = require("express");
// var app = express();

// app.use(express.static("release/layaweb/v1.0.0")).listen(8080);

const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

// app.use(function (req, res) {
// res.send({ msg: "hello" });
// });
app.use(express.static("bin"))

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function Sensor(nid, type)
{
    this.nid = nid;
    this.type = 0;// 0:camera 1:lidar 2:radar 3:GPS 4:IMU
    
}

function Client(cid,socket)
{
    this.cid = cid;
    this.socket = socket;

    this.send = function(msg)
    {
        //if(msg instanceof String)
        //{
        //    msg = JSON.parse(msg);
        //}

        if(msg instanceof Object)
        {
            console.log("----------obj!");
            msg = JSON.stringify(msg);
        }else console.log("----------str!");

        this.socket.send(msg);
    }
}

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

Client.create = function(type, cid, socket)
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

}
////////////////////////

function LogicServer()
{
    this.clients = new Object();
    this.cids = new Object();
    this.cid_seed = 0;
    this.genCid = function()
    {
        return ++this.cid_seed;
    }

    this.isAuth = function(cid_or_socket)
    {
        return this.clients[socketcid_or_socket]!=null;
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
        var cid = this.genCid();
        var client = Client.create(type, cid, socket);
        this.clients[cid]= this.clients[socket]= client;
        this.cids[cid]=cid;
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
}
var self = new LogicServer();
wss.on('connection', function connection(socket, req) {
    const location = url.parse(req.url, true);
    
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    
    socket.on('close', function incoming(code, reason) {
	    console.log('disconnect: code=%d, reason="%s"', code, reason);
        self.removeSocket(socket);
    });

    socket.on('error', function incoming(err) {
	    console.log("error:"+err);
    });

    socket.on('message', function incoming(message) {
        console.log('received: %s', message);

        //if(pack!=null)
        //    console.log('received: %s', pack.message);
        //else
        //    console.log('received: %s', message);

        if(!self.isAuth(socket) && message.indexOf("{")<0)
        {
            socket.send(message);
            return;
        }
        
        var pack = JSON.parse(message);
        console.log("received packet:%s", pack.method);
        switch(pack.method)
        {
            case "chat":
            {
                this.broadcast(message);
                break;
            }
            case "auth":
            {
                var type = pack.type;
                var client = self.addClient(type, socket);
                console.log("auth client:%d", client.cid);
                pack.cid = client.cid;
                client.send(pack); 
                break;
            }
            default:
            {
                console.log(pack.method);
                socket.send(message); 
                break;
            }
        }
        
    });
    
    console.log("new connect!");
    var welcome = JSON.stringify({method:"hello", message:"welcome!"});
    //socket.send(welcome);
});

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});
