// var Loader = laya.net.Loader;
// var Handler = laya.utils.Handler;

// Laya.init(600, 400, Laya.WebGL);

// Laya.loader.load("res/atlas/comp.atlas", 
// Handler.create(this, onAssetLoaded), null, Loader.ATLAS);

// function onAssetLoaded()
// {
// Laya.stage.addChild(new DrivingUI());
// }

//(function()
//{
/*
var Stage   = Laya.Stage;
var WebGL   = Laya.WebGL;

    // 项渲染器

var WIDTH = 200, HEIGHT = 50;

function MapItem()
{
    var Image = Laya.Image;
    var Box   = Laya.Box;

    MapItem.super(this);
    this.size(WIDTH, HEIGHT);
    this.img = new Image();
    this.addChild(this.img);

    this.setImg = function(src)
    {
        this.img.skin = src;
    }
}
Laya.class(MapItem, "MapItem", Laya.Box);

function MapBox()
{
    var List    = Laya.List;
    var Handler = Laya.Handler;
    
    MapBox.super(this);

    console.log("1111111111111---map-list");
    this.width = 200;
    this.height = 600;
    this.x = this.y = 0;

    this.setup = function()
    {
        console.log("2222222---map-list");
        var list = new List();

        list.itemRender = MapItem;

        list.repeatX = 1;
        list.repeatY = 4;

        list.x = 5;//(this.width - WIDTH) / 2;
        list.y = 50;//(this.height - HEIGHT * list.repeatY) / 2;

        // 使用但隐藏滚动条
        list.vScrollBarSkin = "";
        list.selectEnable = true;
        list.selectHandler = new Handler(this, this.onSelect);
        list.renderHandler = new Handler(this, this.updateItem);
        this.addChild(list);
        console.log("3333---map-list");

        // 设置数据项为对应图片的路径
        var data = [];
        for (var i = 0; i < 12; ++i)
        {
            data.push("res/1.png");
            data.push("res/1.png");
        }
        list.array = data;
        
        console.log("444444---map-list");
    }

    this.updateItem = function(cell, index)
    {
        cell.setImg(cell.dataSource);
    }

    this.onSelect = function(index)
    {
        console.log("当前选择的索引：" + index);
    }
}
Laya.class(MapBox, "MapBox", Laya.Box);

// 不支持WebGL时自动切换至Canvas
Laya.init(Laya.Browser.width, Laya.Browser.height, WebGL);

Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;

//Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
Laya.stage.scaleMode = Stage.SCALE_FIXED_AUTO;
Laya.stage.bgColor = "#fff0ff"; //232628
Laya.stage.bgColor = "#ffffff";


var box = new MapBox();
//Laya.stage.addChild(box);
box.setup();

var ui = new DrivingUI();
Laya.stage.addChild(ui);
ui.addChild(box);
//Laya.stage.resizeable();
//var dialog = new Laya.Image("res/1.png");
//dialog.x = dialog.y = 10;//(10,10);
//Laya.stage.addChild(dialog);
*/

//Laya.stage.addChild(new MainUI());

//})();
