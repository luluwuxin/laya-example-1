var ObjectPointType = {
    OBSTACLE_ROUTE_POINT: "obstacle route point",
    MAIN_CAR_ROUTE_POINT: "main car route point",
    MAIN_CAR_START_POINT: "main car start point"
};

class ObjectPoint extends EventObject
{
    constructor(pointType)
    {
        super();
        this.pointType = pointType;

        // Variables below shall be set after it added to obstacle.
        this._owner = null;
        this.index = -1;
    }

    getOwner()
    {
        return this._owner;
    }

    setOwner(owner)
    {
        this._owner = owner;
    }

    hasNextRoutePoint()
    {
        return this.getOwner() != null && this.index + 1 < this.getOwner().getRoutePointCount();
    }

    hasPrevRoutePoint()
    {
        return this.index > 0;
    }

    nextRoutePoint()
    {
        if (this.hasNextRoutePoint())
        {
            return this.getOwner().getRoutePoint(this.index + 1);
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
            return this.getOwner().getRoutePoint(this.index - 1);
        }
        else
        {
            return null;
        }
    }
}