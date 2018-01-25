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
    //Laya.stage.bgColor = "#f0faf0"; //232628
    Laya.stage.bgColor = "#000000";

    Laya.loader.load([
        "res/atlas/comp.atlas",
        "res/atlas/custom.atlas",
        "res/atlas/Scenes/IndustrialCity/assets/obstacle.atlas",
        "res/atlas/Scenes/ParkingLot/assets/obstacle.atlas",
    ], Handler.create(this, onAssetLoaded), null, Laya.Loader.ATLAS);

    function onAssetLoaded()
    {
        var PURE_EDITOR_MODE = false;
        if (PURE_EDITOR_MODE)
        {
            var editor = new ObstacleEditor();
            editor.createMainUI(Laya.stage);
            editor.loadMapDataByMapName("IndustrialCity");
            editor.loadCaseData('{"obstacles":[{"moveStates":[{"quat":{"x":0,"y":0,"z":0,"w":1},"tran":{"x":-9263.800182481751,"y":-9374.14461678832,"z":150},"is_reversing":false,"timestamp_interval":1,"speed":500,"lock_type":"speed"},{"quat":{"x":0,"y":0,"z":0,"w":1},"tran":{"x":-7195.483576642336,"y":-8996.920620437955,"z":150},"is_reversing":false,"timestamp_interval":4.212119063220818,"speed":500,"lock_type":"speed"},{"quat":{"x":0,"y":0,"z":0,"w":1},"tran":{"x":-6625.798357664234,"y":-8309.192518248175,"z":150},"is_reversing":false,"timestamp_interval":1.9290429366464497,"speed":500,"lock_type":"speed"},{"quat":{"x":0,"y":0,"z":0,"w":1},"tran":{"x":-7241.674270072993,"y":-7821.624087591241,"z":150},"is_reversing":false,"timestamp_interval":1.9327006204115664,"speed":500,"lock_type":"speed"},{"quat":{"x":0,"y":0,"z":0,"w":1},"tran":{"x":-5958.599452554745,"y":-7549.612226277372,"z":150},"is_reversing":false,"timestamp_interval":2.6368143157978308,"speed":500,"lock_type":"speed"}],"type":"car","name":"obstacle-0"},{"moveStates":[],"type":"car","name":"obstacle-1"}]}');
            return;
        }
        // WebClient is shared across webpages.
        var client = new WebClient();

        // Chart overlay on the Laya stage.
        var sensorChart = new SensorChart(client);

        // Webpages
        var pageChooser = {
            goTo: function (name) {
                Object.entries(pageChooser.pages).forEach(function (p) {
                    p[1].visible = (p[0] === name);
                });
                pageChooser.sensorChart.bind(pageChooser.pages[name]);
            },
            pages: {},
            sensorChart: sensorChart,
        };
        Object.assign(pageChooser.pages, {
            mainUI:     new MainUI(pageChooser),
            setupUI:    new SetupUI(pageChooser, client),
            drivingUI:  new DrivingUI(pageChooser, client),
            scenarioUI: new ScenarioUI(pageChooser, client),
        });

        // Init stage
        Object.values(pageChooser.pages).forEach(function (p) {
            p.visible = false;
            Laya.stage.addChild(p);
        });
        pageChooser.pages.mainUI.visible = true;
    }
    
})();
