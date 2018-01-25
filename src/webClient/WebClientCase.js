class WebClientCase
{
    constructor()
    {
        this.json = null;
        this.selectedCaseId = -1;
    }

    _getSceneConfig(sceneName)
    {
        // TODO: read from file.
        var cfg = {
            IndustrialCity: {
                "mapInfo":
                {
                    "relativeImagePath": "assets/map/map.png",
                    "height": 4384,
                    "width": 4384,
                    "minX": -11250,
                    "maxX": 11250,
                    "minY": -11250,
                    "maxY": 11250,
                    "objectZ": 150
                },
                "obstacleInfo":
                {
                    "car": {
                        "relativeImagePath": "assets/obstacle/car.png",
                        "bpPath": "todo"
                    },
                    "man": {
                        "relativeImagePath": "assets/obstacle/man.png",
                        "bpPath": "todo"
                    },
                    "plane": {
                        "relativeImagePath": "assets/obstacle/man.png",
                        "bpPath": "todo"
                    }
                }
            },
            ParkingLot: {
                "mapInfo":
                {
                    "relativeImagePath": "assets/map/map.png",
                    "height": 1705,
                    "width": 5117,
                    "minX": -6720,
                    "maxX": 8280,
                    "minY": -2850,
                    "maxY": 2150,
                    "objectZ": 0
                },
                "obstacleInfo":
                {
                    "car": {
                        "relativeImagePath": "assets/obstacle/car.png",
                        "bpPath": "/Game/Blueprints/BP_ParkCar.BP_ParkCar"
                    }
                }
            }
        }
        return cfg[sceneName];
    }

    _getCaseId(c)
    {
        return c.name;
    }

    _createCaseName(sceneName)
    {
        var indexes = new Set();
        var list = this.getList();
        var prefix = sceneName + "-";
        var preLen = prefix.length;
        for (var i = 0; i < list.length; i++)
        {
            var name = list[i].name;
            if (name.substring(0, preLen) != prefix)
            {
                continue;
            }
            var num = Number(name.substring(preLen));
            if (isNaN(num) == false)
            {
                indexes.add(num);
            }
        }
        for (var i = 0; ; i++)
        {
            if (indexes.has(i))
            {
                continue;
            }
            return prefix + i;
        }
    }

    getList()
    {
        return this.case_list.list;
    }

    getIndex(caseId)
    {
        var list = this.getList();
        for (var i = 0; i < list.length; i++)
        {
            if (this._getCaseId(list[i]) == caseId)
            {
                return i;
            }
        }
        return -1;
    }

    selectCase(caseId)
    {
        this.selectedCaseId = caseId;
    }

    getSelectedCase()
    {
        return this.getCase(this.selectedCaseId);
    }

    getSelectedCaseId()
    {
        return this.selectedCaseId;
    }

    getCase(caseId)
    {
        var index = this.getIndex(caseId);
        if (index == -1)
        {
            return null;
        }
        else
        {
            return this.getList()[index];
        }
    }

    // If there is already a case with same ID, replace it,
    // or push the caseJson.
    insert(caseJson)
    {
        var index = this.getIndex(this._getCaseId(caseJson));
        if (index == -1)
        {
            this.getList().push(caseJson);
        }
        else
        {
            this.getList()[index] = caseJson;
        }
    }

    insertDefault(sceneName = "ParkingLot")
    {
        var ret = {};
        ret.scene = sceneName;
        ret.name = this._createCaseName(sceneName);
        ret.content = '{"obstacles":[]}';
        ret.scene_config = this._getSceneConfig(sceneName);
        this.insert(ret);
    }

    init(json)
    {
        this.case_list = Object.assign(this.case_list || {}, json);
    }

    toJson ()
    {
        return this.case_list;
    }
}