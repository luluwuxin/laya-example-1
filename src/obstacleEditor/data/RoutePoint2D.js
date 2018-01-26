var RoutePointEvent = 
{
    LINK_LINE_CHANGED: "link line changed"
};

// variable | unit
//   x, y   |  cm
//   speed  |  cm/s
// timstamp |  s
class RoutePoint2D extends EventObject
{
    constructor(
        mapData = null,
        pose = new Pose(), 
        isReversing = false,
        timestampInterval = 1,
        speed = 500,
        lockType = RoutePointLockType.SPEED
        )
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
        this.timestampInterval = timestampInterval;
        this.speed = speed;
        this.isReversing = isReversing;
        this.lockType = lockType;

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

        if (this.hasPrevRoutePoint())
        {
            return this.prevRoutePoint().getTimestampSec() + this.timestampInterval;
        }
        else
        {
            return this.timestampInterval;
        }
    }

    clone ()
    {
        var ret = new RoutePoint2D();
        ret.x = this.x;
        ret.y = this.y;
        ret.z = this.z;
        ret.rotation = this.rotation;
        ret.timestampInterval = this.timestampInterval;
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
            "timestamp_interval": this.timestampInterval,
            "speed": this.speed,
            "lock_type": this.lockType
        };
    }

    _setValueInternal(...kvPair)
    {
        return super.setValue(...kvPair);
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
        var poseChanged = checkKey(["isReversing", "x", "y", "rotation"]);
        var intervalInfoChanged = checkKey(["timestampInterval", "speed"]);
        assert(!(poseChanged && intervalInfoChanged));
        if (intervalInfoChanged)
        {
            this._refreshTimeOrSpeed(keys);
        }
        if (poseChanged)
        {
            if (this.hasPrevRoutePoint())
            {
                this.prevRoutePoint()._refreshLinkLine();
            }
            this._refreshLinkLine();
            this._refreshTimeOrSpeed();
        }
    }

    static getBezierControlPoint(pointS, pointE)
    {
        function getControlPoint(point, isStartPoint, isReversing, dirDis)
        {
            var rad = point.rotation / 180 * Math.PI;
            var dirY = Math.sin(rad);
            var dirX = Math.cos(rad);
            var dir = {x: dirX, y: dirY};
            if (isReversing)
            {
                dir = {x: -dir.x, y: -dir.y};
            }
            if (isStartPoint == false)
            {
                dir = {x: -dir.x, y: -dir.y};
            }
            return new Vec3(point.x + dir.x * dirDis, point.y + dir.y * dirDis);
        }
        var dis = Math.sqrt((pointS.x - pointE.x) ** 2 + (pointS.y - pointE.y) ** 2);
        var dirDis = Math.min(500, dis / 2.5);
        var p1 = getControlPoint(pointS, true, pointS.isReversing, dirDis);
        var p2 = getControlPoint(pointE, false, pointS.isReversing, dirDis);
        return [p1, p2];
    };

    _refreshLinkLine()
    {
        function _getBezierCurve()
        {
            var nextPoint = this.nextRoutePoint();
            var p0 = new Vec3(this.x, this.y);
            var p3 = new Vec3(nextPoint.x, nextPoint.y);
            var p12 = RoutePoint2D.getBezierControlPoint(this, nextPoint);
            return new CubicBezierCurve(p0, p12[0], p12[1], p3);
        }
        if (this.hasNextRoutePoint())
        {
            // refresh link line
            this.linkLineLength = _getBezierCurve.call(this).getLength();
        }

        this.sendEvent(RoutePointEvent.LINK_LINE_CHANGED);
    }

    _refreshTimeOrSpeed (keys = null)
    {
        if (this.hasPrevRoutePoint() == false)
        {
            return;
        }
        var prevPoint = this.prevRoutePoint();
        var prevLinkLineLength = prevPoint.linkLineLength;
        var prevSpeed = prevPoint.speed;
        var setSpeed = false;
        if (keys != null && keys.has("speed"))
        {
            setSpeed = false;
        }
        else if (keys != null && keys.has("timestampInterval"))
        {
            setSpeed = true;
        }
        else
        {
            setSpeed = (this.lockType == RoutePointLockType.TIMESTAMP_FROM_PREV_POINT);
        }
        if (setSpeed)
        {
            this._setValueInternal("speed", prevLinkLineLength * 2 / this.timestampInterval - prevSpeed);
        }
        else
        {
            this._setValueInternal("timestampInterval", prevLinkLineLength * 2 / (prevSpeed + this.speed));
        }
        if (this.hasNextRoutePoint())
        {
            this.nextRoutePoint()._refreshTimeOrSpeed();
        }
    }

    hasNextRoutePoint()
    {
        return this.obstacle != null && this.index + 1 < this.obstacle.getRoutePointCount();
    }

    hasPrevRoutePoint()
    {
        return this.index > 0;
    }

    nextRoutePoint()
    {
        if (this.hasNextRoutePoint())
        {
            return this.obstacle.getRoutePoint(this.index + 1);
        }
        else
        {
            return null;
        }
    }

    prevRoutePoint()
    {
        if (this.hasPrevRoutePoint())
        {
            return this.obstacle.getRoutePoint(this.index - 1);
        }
        else
        {
            return null;
        }
    }
}
