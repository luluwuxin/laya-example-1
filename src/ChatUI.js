////////////////////////////////////////
// 创建ChateUI的子类
function ChatUI()
{
    var Event = laya.events.Event;
    TestUI.super(this);
    //btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
    this.btn_send.on(Event.CLICK, this, onBtnClick);
    
	this.socket = new Laya.Socket();

	//这里我们采用小端
	this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
	//建立连接
	this.socket.connectByUrl("ws://localhost:8080");
	this.socket.on(Laya.Event.OPEN, this, openHandler);
	this.socket.on(Laya.Event.MESSAGE, this, receiveHandler);
	this.socket.on(Laya.Event.CLOSE, this, closeHandler);
	this.socket.on(Laya.Event.ERROR, this, errorHandler);
	
	function openHandler(event){
        	console.log("connected!");
		this.socket.send(JSON.stringify({method:"auth", type:0}));
	}

	function receiveHandler(data){
        	console.log("recv:"+data);
        	var msg = JSON.parse(data);
        	this.ta_content.text += msg.method+":"+msg.msg+"\n";
	}

	function closeHandler(e){
        	console.log("disconnected!");
	}

	function errorHandler(e){
        	console.log("err:"+e);
	}

    function onBtnClick()
    {
        var msg = {method:"chat", msg:this.input_msg.text, hello:[111,222,333]};
		this.socket.send(JSON.stringify(msg));
    }
}
Laya.class(ChatUI, "ChatUI", ChatPageUI);