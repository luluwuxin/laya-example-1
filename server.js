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

function Client()
{
    
    this.clis = {};
    this.nids={};
    this.nodes={};
    this.cids = {};
}

function LogicServer()
{
    this.clients = new Object();
    this.sockets = new Object();
    this.cid_seed = 0;
    this.genCid = function()
    {
        return ++this.cid_seed;
    }

    this.isAuth = function(socket)
    {
        return this.sockets[socket]!=null;
    }

    this.cid2socket = function(cid)
    {
        var info = this.clients[cid];
        if(info==null)
            return null;
        return info.socket;
    }

    this.socket2cid = function(socket)
    {
        var cid = this.sockets[socket];
        if(cid==null)
            return null;
        return cid;
    }

    this.nid2socket = function(nid)
    {
        return 1;
    }

    this.nid2cid = function(nid)
    {
        return 1;
    }

    this.addClient = function(socket)
    {
        var cid = this.genCid();
        this.clients[cid]= {socket:socket};
        this.sockets[socket]= cid;
        return cid;
    }

    this.removeSocket = function(socket)
    {
        var cid = this.sockets[socket];
        if(cid!=null)
        {
            delete this.sockets[socket];
            delete this.clients[cid];
        }
        
    }

    this.removeClient = function(cid)
    {
        var cli = this.clients[cid];
        if(info!=null)
        {
            var socket = cli.socket;
            delete this.sockets[socket];
            delete this.clients[cid];
        }
    }

    this.addNode = function(nid, obj)
    {

    }

    this.removeNode = function(nid)
    {

    }

    this.send2Client = function(cid, msg)
    {
        if(msg instanceof String)
        {
            msg = JSON.parse(msg);
        }
        var cli = this.clients[cid];
        if(cid!=null)
        {
            cli.socket.send(JSON.stringify(msg));
        }
    }

    this.send2Socket = function(socket, msg)
    {
        var cid = this.sockets[socket];
        if(cid!=null)
        {
            var cli = this.clients[cid];
            cli.send(JSON.stringify(msg));
        }
        
    }

    this.send2Node = function(nid, msg)
    {
        if(msg instanceof String)
        {
            msg = JSON.parse(msg);
        }
    }

    this.broadcast = function(msg, except)
    {
        for(var cli in this.clients)
        {
            if(cli!=except)
                this.send2Client(cli,msg);
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
        //var pack = JSON.parse(message);
        //if(pack!=null)
        //    console.log('received: %s', pack.message);
        //else
        //    console.log('received: %s', message);

        socket.send(message);
    });
    var cid = self.addClient(socket);
    console.log("new connect:%d", cid);
    var pack_auth = {method:"auth", cid: cid};
    self.send2Client(cid, pack_auth);
});

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});
