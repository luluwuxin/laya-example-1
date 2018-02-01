var SceneObjectEvent = 
{
    ROUTE_POINT_ADDED: "route point added",
    ROUTE_POINT_REMOVED: "route point removed"
};

var SceneObjectType = 
{
    OBSTACLE: "obstacle",
    MAIN_CAR: "main car"
}

class SceneObject extends EventObject
{
    constructor(sceneObjectType)
    {
        super();
        this.sceneObjectType = sceneObjectType;
        this.route = new Route();
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

        routePoint.setOwner(this);
        routePoint.index = index;

        for (var i = index + 1; i < this.route.points.length; i++)
        {
            this.route.points[i].index = i;
        }

        // Send events after all operation finished, or in callback it will get incorrect value.
        this.sendEvent(SceneObjectEvent.ROUTE_POINT_ADDED, routePoint);
        for (var i = index + 1; i < this.route.points.length; i++)
        {
            this.route.points[i].sendEvent(ObjectEvent.VALUE_CHANGED, new Set(["index"]));
        }

        routePoint.afterAdded();
    }

    removeRoutePoint (routePoint)
    {
        var index = routePoint.index;
        this.route.points.splice(index, 1);
        for (var i = index; i < this.route.points.length; i++)
        {
            this.route.points[i].index = i;
        }

        routePoint.clearEvent();
        // Send events after all operation finished, or in callback it will get incorrect value.
        this.sendEvent(SceneObjectEvent.ROUTE_POINT_REMOVED, routePoint);
        for (var i = index; i < this.route.points.length; i++)
        {
            this.route.points[i].sendEvent(ObjectEvent.VALUE_CHANGED, new Set(["index"]));
        }
        routePoint.afterRemoved();
    }
}