////////////////////////////////////////
// 创建ChateUI的子类

var WIDTH = 200, HEIGHT = 50;

function LeftItem()
{
    LeftItem.super(this);
    this.size(WIDTH, HEIGHT);
    this.img = new Laya.Image();
    this.addChild(this.img);

    this.setImg = function(src)
    {
        this.img.skin = src;
    }
}
Laya.class(LeftItem, "LeftItem", Laya.Box);

function MainUI()
{
    var Event = laya.events.Event;
    MainUI.super(this);
    console.log("11111111111111");
    //this.list_left = new Laya.List();

    this.list_left.itemRender = LeftItem;

    this.list_left.repeatX = 1;
    this.list_left.repeatY = 4;
    //this.list_left.WIDTH = 200;
    //this.list_left.HEIGHT =600;
    this.list_left.x = 5;//(this.width - WIDTH) / 2;
    this.list_left.y = 50;//(this.height - HEIGHT * list.repeatY) / 2;
    this.list_left.itemRender = LeftItem;

    // 使用但隐藏滚动条
    this.list_left.vScrollBarSkin = "";
    this.list_left.selectEnable = true;
    this.list_left.selectHandler = new Handler(this.list_left, this.onSelect);
    this.list_left.renderHandler = new Handler(this.list_left, this.updateItem);
    //this.addChild(this.list_left);
    console.log("22222222222222");
    // 设置数据项为对应图片的路径
    var data = [];
    for (var i = 0; i < 5; ++i)
    {
        data.push("res/1.png");
        data.push("res/1.png");
    }
    this.list_left.array = data;
    console.log("333333333333");
    this.updateItem = function(cell, index)
    {
        cell.setImg(cell.dataSource);
    }

    this.onSelect = function(index)
    {
        console.log("当前选择的索引：" + index);
    }

    //btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
    //this.btn_send.on(Event.CLICK, this, onBtnClick);
    this.isConnected = false;
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
        this.isConnected = true;
		this.socket.send(JSON.stringify({method:"auth", type:0}));
	}

	function receiveHandler(data){
        console.log("recv:"+data);
        var msg = JSON.parse(data);
        //this.ta_content.text += msg.method+":"+msg.msg+"\n";
	}

	function closeHandler(e){
        console.log("disconnected!");
	}

	function errorHandler(e){
		if(this.isConnected)
        	console.log("err:"+e);
	}

    function onBtnClick()
    {
        var msg = {method:"chat", msg:this.input_msg.text, hello:[111,222,333]};
		this.socket.send(JSON.stringify(msg));
    }
}
Laya.class(MainUI, "MainUI", MainPageUI);