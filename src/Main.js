var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;

Laya.init(600, 400, Laya.WebGL);

Laya.loader.load("res/atlas/comp.atlas", 
                    Handler.create(this, onAssetLoaded), null, Loader.ATLAS);

function onAssetLoaded()
{
    Laya.stage.addChild(new ChatUI());
}
