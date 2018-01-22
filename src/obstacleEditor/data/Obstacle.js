var ObstacleEvent = 
{
    ROUTE_POINT_ADDED: "route point added",
    ROUTE_POINT_REMOVED: "route point removed",
    BASE_INFO_CHANGED: "base info changed"
};

class Obstacle extends EventObject
{
    constructor(type, name)
    {
        super();
        this.type = type;
        this.name = name;
        this.route = new Route();
    }

    setName(name)
    {
        this.name = name;
        this.sendEvent(ObstacleEvent.BASE_INFO_CHANGED);
    }

    setType(type)
    {
        this.type = type;
        this.sendEvent(ObstacleEvent.BASE_INFO_CHANGED);
    }

    getRoutePoint(index)
    {
        return this.route.points[index];
    }

    getRoutePoints()
    {
        return this.route.points;
    }

    getRoutePointCount()
    {
        return this.route.points.length;
    }

    // index = -1 means push_back, or the route point will be inserted before index-th element.
    addRoutePoint (routePoint, index = -1)
    {
        if (index == -1)
        {
            this.route.points.push(routePoint);
            index = this.route.points.length - 1;
        }
        else
        {
            this.route.points.splice(index, 0, routePoint);
        }

        routePoint.obstacle = this;
        routePoint.index = index;

        for (var i = index + 1; i < this.route.points.length; i++)
        {
            this.route.points[i].index = i;
        }

        // Send events after all operation finished, or in callback it will get incorrect value.
        this.sendEvent(ObstacleEvent.ROUTE_POINT_ADDED, routePoint);
        for (var i = index + 1; i < this.route.points.length; i++)
        {
            this.route.points[i].sendEvent(ObjectEvent.VALUE_CHANGED, new Set(["index"]));
        }
        routePoint._refreshLinkLine();
        // link line of prev point shall change
        if (index > 0)
        {
            this.route.points[index - 1]._refreshLinkLine();
        }
    }

    removeRoutePoint (routePoint)
    {
        var index = routePoint.index;
        this.route.points.splice(index, 1);
        for (var i = index; i < this.route.points.length; i++)
        {
            this.route.points[i].index = i;
        }

        // Send events after all operation finished, or in callback it will get incorrect value.
        this.sendEvent(ObstacleEvent.ROUTE_POINT_REMOVED, routePoint);
        for (var i = index; i < this.route.points.length; i++)
        {
            this.route.points[i].sendEvent(ObjectEvent.VALUE_CHANGED, new Set(["index"]));
        }
        // link line of prev point shall change
        if (index > 0)
        {
            this.route.points[index - 1]._refreshLinkLine();
        }
    }

    toJson()
    {
        var routePointsJsonObj = [];
        for (var routePoint of this.route.points)
        {
            routePointsJsonObj.push(routePoint.toJson());
        }
        return {
            "moveStates": routePointsJsonObj,
            "type": this.type,
            "name": this.name
        }
    }
}
