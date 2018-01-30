class MainCar extends Obstacle
{
    constructor(
        startPoint = new MainCarSEPoint2D(null, new Pose(), ObjectPointType.MAIN_CAR_START_POINT)
        , endPoint = new MainCarSEPoint2D(null, new Pose(), ObjectPointType.MAIN_CAR_END_POINT)
        , timeLimit = 10
        )
    {
        super();

        delete this.type;
        delete this.name;

        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.route = new Route();
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
            "endPoint": this.endPoint.toJson(),
            "route": routePointsJsonObj,
            "timeLimit": this.timeLimit
        }
    }
}