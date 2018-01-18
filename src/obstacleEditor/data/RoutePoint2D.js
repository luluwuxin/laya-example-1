var RoutePointEvent = 
{
    LINK_LINE_CHANGED: "link line changed"
};

class RoutePoint2D extends EventObject
{
    constructor(mapData = null, pose = new Pose(), timestampFromPrevPoint = 2, isReversing = false)
    {
        super();
        this.x = pose.vec3.x;
        this.y = pose.vec3.y;
        if (mapData != null)
        {
            this.z = mapData.mapInfo.objectZ;
        }
        else
        {
            this.z = 0;
        }
        this.rotation = Math.atan2(pose.quat.z, pose.quat.w) * 2 / Math.PI * 180;
        this.timestampFromPrevPoint = timestampFromPrevPoint;
        this.isReversing = isReversing;

        // Variables below shall be set after it added to obstacle.
        this.obstacle = null;
        this.index = -1;
    }

    getTimestampSec()
    {
        if (this.index == -1)
        {
            return 0;
        }

        if (this.index == 0)
        {
            return this.timestampFromPrevPoint;
        }
        else
        {
            return this.obstacle.getRoutePoint(this.index - 1).getTimestampSec() + this.timestampFromPrevPoint;
        }
    }

    clone ()
    {
        var ret = new RoutePoint2D();
        ret.x = this.x;
        ret.y = this.y;
        ret.z = this.z;
        ret.rotation = this.rotation;
        ret.timestampFromPrevPoint = this.timestampFromPrevPoint;
        ret.isReversing = this.isReversing;
        return ret;
    }

    toJson()
    {
        var rad = this.rotation / 180 * Math.PI;
        return {
            "quat": {
                "x": 0,
                "y": 0,
                "z": Math.sin(rad / 2),
                "w": Math.cos(rad / 2)
            },
            "tran": {
                "x": this.x,
                "y": this.y,
                "z": this.z
            },
            "is_reversing": this.isReversing,
            "timestamp_sec": this.getTimestampSec()
        };
    }

    setValue(...kvPair)
    {
        var keys = super.setValue(...kvPair);
        var checkedKeys = ["isReversing", "x", "y", "rotation"];
        var poseChanged = false;
        for (var key of checkedKeys)
        {
            if (keys.has(key))
            {
                poseChanged = true;
                break;
            }
        }
        if (poseChanged)
        {
            this.sendEvent(RoutePointEvent.LINK_LINE_CHANGED);

            // TODO: If only isReversing is set, it's not neccessary to refresh prev point's link line.
            if (this.index > 0)
            {
                this.obstacle.getRoutePoint(this.index - 1).sendEvent(RoutePointEvent.LINK_LINE_CHANGED);
            }
        }
    }
}
