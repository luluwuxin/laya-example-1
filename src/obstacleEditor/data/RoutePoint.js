class RoutePoint extends ObjectPoint
{
    constructor(pose = new Pose(), timestampInterval = 0)
    {
        super(ObjectPointType.OBSTACLE_ROUTE_POINT);
        this.pose = pose;
        this.timestampInterval = timestampInterval;
    }
}
