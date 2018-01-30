'use strict';
// server.js --- This is where you apply your OCD.
//
// Copyright (C) 2018 Damon Kwok
//
// Author: gww <damon-kwok@outlook.com>
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
const url = require('url');
const http = require('http');
const WebSocket = require('ws');
const express = require('express');

const utils = require("./Utils.js");
const FileHelper = require("./Helper.js");
const LogicServer = require("./Server.js").LogicServer;


const app = express();
// app.use(function (req, res) {
// res.send({ msg: "hello" });
// });
app.use(express.static("release/web"))

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

var ccc = null;
////////////////////////////////////////////////////////////////////////
var logic = new LogicServer();
////////////////////////////////////////////////////////////////////////

wss.on('connection', function(socket, req) {
    const location = url.parse(req.url, true);
	var remoteAddress = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;

	socket.remoteAddress = remoteAddress.split(":")[3];

    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    socket.on('close', function(code, reason) {
        var prename = logic.isAuth(socket) ? "auth" : "unauth";
		console.log("!losed! " + prename + ' client %s disconnect: code=%d, reason="%s"',
					socket.remoteAddress, code, reason);
        logic.removeSocket(socket);
    });

    socket.on('error', function(err) { //incoming
		console.log("error:"+err);
    });

    socket.on('message', function(msg) {
        try{
			var pack = JSON.parse(msg);
			if(logic.isAuth(socket)==false)
			{
				if(pack.method=="auth")
				{
					logic.procAuth(socket, pack);
				}
				else
				{
					console.log("%s !!unauth!! message:%s", socket.remoteAddress, msg);
					socket.send(msg);
				}
			}
			else{
				logic.procMessage(socket, pack);	
			}
			
		}catch(err)
		{
			console.log("%s error:%s", socket.remoteAddress, err);
		}
        
    });
    
	console.log("!new! unauth connect:%s!", socket.remoteAddress);
    // var welcome = JSON.stringify({method:"hello", msg:"unauth!"});
    // socket.send(welcome);
});

FileHelper.saveStringToFile("123", "db/heihei");
var sss = FileHelper.loadStringFromFile("db/heihei");
console.log(sss);

server.listen(8081, function listening() {
    console.log('Listening on %d', server.address().port);
    // utils.openUrl("http://127.0.0.1:"+server.address().port);
});