var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;

// Laya.init(600, 400, Laya.WebGL);

// Laya.loader.load("res/atlas/comp.atlas", 
// Handler.create(this, onAssetLoaded), null, Loader.ATLAS);

// function onAssetLoaded()
// {
// Laya.stage.addChild(new DrivingUI());
// }

(function()
{
    var Stage   = Laya.Stage;
    var WebGL   = Laya.WebGL;

    // 不支持WebGL时自动切换至Canvas
    Laya.init(Laya.Browser.width, Laya.Browser.height, WebGL);
    Laya3D.init(0, 0, true);

    Laya.stage.alignV = Stage.ALIGN_MIDDLE;
    Laya.stage.alignH = Stage.ALIGN_CENTER;

    //Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
    Laya.stage.scaleMode = Stage.SCALE_FIXED_AUTO;
    Laya.stage.bgColor = "#f0faf0"; //232628
    //Laya.stage.bgColor = "#ffffff";

    Laya.loader.load([
        "res/atlas/comp.atlas",
        "res/atlas/custom.atlas",
    ], Handler.create(this, onAssetLoaded), null, Laya.Loader.ATLAS);

    function onAssetLoaded()
    {
        // WebClient is shared across webpages.
        var client = new WebClient();

        // Webpages
        var pages = {};
        Object.assign(pages, {
            mainUI:     new MainUI(pages),
            setupUI:    new SetupUI(pages, client),
            drivingUI:  new DrivingUI(pages, client),
            scenarioUI: new ScenarioUI(pages, client),
        });

        // Init stage
        Object.values(pages).forEach(function (p) {
            p.visible = false;
            Laya.stage.addChild(p);
        });
        pages.drivingUI.visible = true;
    }
    
})();