class MainCarRoutePoint2D extends ObjectPoint
{
    constructor(vec3 = new Vec3())
    {
        super(ObjectPointType.MAIN_CAR_ROUTE_POINT);
        this.setLocation(vec3);
    }

    toJson()
    {
        return {
            "x": this.x,
            "y": this.y,
            "z": this.z
        };
    }

    setLocation(vec3)
    {
        Object.assign(this, vec3);
    }

    clone ()
    {
        var ret = new MainCarRoutePoint2D();
        ret.x = this.x;
        ret.y = this.y;
        ret.z = this.z;
        return ret;
    }

    setValue(...kvPair)
    {
        var keys = super.setValue(...kvPair);

        if (keys.size == 0)
        {
            return;
        }

        function checkKey(checkedKeys)
        {
            for (var key of checkedKeys)
            {
                if (keys.has(key))
                {
                    return true;
                }
            }
            return false;
        }
        var poseChanged = checkKey(["x", "y"]);
        if (poseChanged)
        {
            if (this.hasPrevRoutePoint())
            {
                this.prevRoutePoint()._refreshLinkLine();
            }
            this._refreshLinkLine();
        }
    }

    _refreshLinkLine()
    {
        this.sendEvent(RoutePointEvent.LINK_LINE_CHANGED);
    }

    afterAdded()
    {
        this._refreshLinkLine();
        // link line of prev point shall change
        if (this.hasPrevRoutePoint())
        {
            this.prevRoutePoint()._refreshLinkLine();
        }
    }

    afterRemoved()
    {
        // link line of prev point shall change
        var prevRoutePoint = this.prevRoutePoint();
        if (prevRoutePoint != null)
        {
            prevRoutePoint._refreshLinkLine();
        }
    }
}