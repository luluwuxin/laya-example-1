class WebClientCase
{
    constructor()
    {
        this.json = null;
        this.selectedCaseId = -1;
    }

    _getCaseId(c)
    {
        return c.name;
    }

    _createCaseName()
    {
        var indexes = new Set();
        var list = this.getList();
        for (var i = 0; i < list.length; i++)
        {
            var name = list[i].name;
            if (name.substring(0, 5) != "case-")
            {
                continue;
            }
            var num = Number(name.substring(5));
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
            return "case-" + i;
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

    insertDefault()
    {
        var ret = {};
        ret.scene = "IndustrialCity";
        ret.name = this._createCaseName();
        ret.content = '{"obstacles":[]}';
        ret.scene_config = '{"mapInfo":{"relativeImagePath":"assets/map/map.png","height":4384,"width":4384,"minX":-11250,"maxX":11250,"minY":-11250,"maxY":11250,"objectZ":150},"obstacleInfo":{"car":{"relativeImagePath":"assets/obstacle/car.png","bpPath":"/Game/Vehicles/Vehicle001BP.Vehicle001BP"},"man":{"relativeImagePath":"assets/obstacle/man.png","bpPath":"/Game/AI/Walker/BP_Walker_01.BP_Walker_01"}}}';
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