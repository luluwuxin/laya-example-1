class WebClientCase
{
    constructor()
    {
        this.json = null;
        this.selectedCaseId = -1;
        this.sceneConfigJsons = {};
    }

    _getSceneConfig(sceneName)
    {
        if (!(sceneName in this.sceneConfigJsons))
        {
            var mapConfigFilePath = AssetsPath.getMapConfigFilePath(sceneName);
            FileHelper.readFile(mapConfigFilePath, this, function(text)
            {
                if (text == "")
                {
                    logError("Load map faile. Path: [{0}]".format(mapConfigFilePath));
                }
                else
                {
                    this.sceneConfigJsons[sceneName] = JSON.parse(text);
                }
            });
        }
        return this.sceneConfigJsons[sceneName];
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

    removeCase(caseId)
    {
        var index = this.getIndex(caseId);
        if (index == -1)
        {
            return false;
        }
        if (caseId == this.selectedCaseId)
        {
            this.selectedCaseId = -1;
        }
        this.getList().splice(index, 1);
        return true;
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