function Client(b,a){this.type=-1;this.cid=b;this.socket=a;this.remoteAddress=a.remoteAddress;this.send=function(a){a instanceof Object&&(a=JSON.stringify(a));try{this.socket.send(a),console.log("sent:%s->%s",this.socket.remoteAddress,a)}catch(d){console.log("sent:"+this.socket.remoteAddress+" err:"+d)}};this.getInfo=function(){return this.socket.remoteAddress};this.isWeb=function(){return 0==this.type};this.isRos=function(){return 1==this.type};this.isUE4=function(){return 2==this.type};this.isUE4d=
function(){return 3==this.type};this.isTopic=function(){return 4==this.type}}function create(b,a,c){a=new Client(a,c);a.type=b;return a}exports.create=create;