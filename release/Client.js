function Client(c,b){this.type=-1;this.cid=c;this.socket=b;this.remoteAddress=b.remoteAddress;this.send=function(a){a instanceof Object&&(a=JSON.stringify(a));try{this.socket.send(a),console.log("sent:%s->%s",this.socket.remoteAddress,a)}catch(d){console.log("xxx----sent:"+this.socket.remoteAddress+" err:"+d+" msg:"+a+" type:"+this.type),this.logic.removeSocket(this.socket)}};this.getInfo=function(){return this.socket.remoteAddress};this.isWeb=function(){return 0==this.type};this.isRos=function(){return 1==
this.type};this.isUE4=function(){return 2==this.type};this.isUE4d=function(){return 3==this.type};this.isTopic=function(){return 4==this.type}}function create(c,b,a){b=new Client(b,a);b.type=c;return b}exports.create=create;
