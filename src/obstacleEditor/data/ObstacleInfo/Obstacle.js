var ObstacleEvent = 
{
    ROUTE_POINT_ADDED: "route point added",
    ROUTE_POINT_REMOVED: "route point removed"
};

class Obstacle extends SceneObject
{
    constructor(type, name)
    {
        super(SceneObjectType.OBSTACLE);
        this.type = type;
        this.name = name;
    }

    setName(name)
    {
        this.setValue("name", name);
    }

    setType(type)
    {
        this.setValue("type", type);
    }

    createRoutePoint(
        mapData = null,
        pose = new Pose(), 
        isReversing = false,
        timestampInterval = 1,
        speed = 500,
        lockType = RoutePointLockType.SPEED
    )
    {
        if (mapData != null)
        {
            pose.vec3.z = mapData.mapInfo.objectZ;
        }

        var point = new RoutePoint2D(
            pose
            , isReversing
            , timestampInterval
            , speed
            , lockType
        );
        
        return point;
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
