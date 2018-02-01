class MainCar extends SceneObject
{
    constructor(
        startPoint = new MainCarStartPoint2D(null, new Pose(), ObjectPointType.MAIN_CAR_START_POINT)
        , timeLimit = 10
        )
    {
        super(SceneObjectType.MAIN_CAR);

        this.startPoint = startPoint;
        this.startPoint.setOwner(this);
        this.timeLimit = timeLimit;
    }

    toJson()
    {
        var routePointsJsonObj = [];
        for (var routePoint of this.route.points)
        {
            routePointsJsonObj.push(routePoint.toJson());
        }
        return {
            "startPoint": this.startPoint.toJson(),
            "route": routePointsJsonObj,
            "timeLimit": this.timeLimit
        }
    }

    createRoutePoint(mapData, pose)
    {
        if (mapData != null)
        {
            pose.vec3.z = mapData.mapInfo.objectZ;
        }

        var point = new MainCarRoutePoint2D(pose.vec3);
        
        return point;
    }
}