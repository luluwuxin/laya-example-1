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

const LogicServer = require("./Server.js").LogicServer;
const utils = require("./Utils.js");

const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();
// app.use(function (req, res) {
// res.send({ msg: "hello" });
// });
app.use(express.static("release/layaweb/v1.0.0"))

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

////////////////////////
var logic = new LogicServer();
wss.on('connection', function connection(socket, req) {
    const location = url.parse(req.url, true);
    
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    
    socket.on('close', function incoming(code, reason) {
	    console.log('disconnect: code=%d, reason="%s"', code, reason);
        logic.removeSocket(socket);
    });

    socket.on('error', function incoming(err) {
	    console.log("error:"+err);
    });

    socket.on('message', function incoming(msg) {
        console.log('received: %s', msg);

        if(!logic.isAuth(socket))
        {
            if(msg.indexOf("{")<0)
            {
                socket.send(msg);
                return;
            }
            
            var pack = JSON.parse(msg);
            if(pack.method=="auth")
            {
                var type = pack.type;
                var client = logic.addClient(type, socket);
                console.log("auth client:%d", client.cid);
                pack.cid = client.cid;
                pack.msg = "welcome!";
                client.send(pack); 
            } else
            {
                socket.send(msg);
            }
            return;
        }
        
        var pack = JSON.parse(msg);
        console.log("received packet:%s", pack.method);
        switch(pack.method)
        {
            case "chat":
            {
                logic.broadcast(msg);
                break;
            }
            default:
            {
                console.log(pack.method);
                socket.send(msg); 
                break;
            }
        }
        
    });
    
    console.log("new unauth connect!");
    var welcome = JSON.stringify({method:"hello", msg:"unauth!"});
    socket.send(welcome);
});

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
    utils.openUrl("http://127.0.0.1:"+server.address().port);
});
