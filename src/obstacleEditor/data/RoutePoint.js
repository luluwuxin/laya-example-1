class RoutePoint extends ObjectPoint
{
    constructor(pose = new Pose(), timestampInterval = 0)
    {
        super(ObjectPointType.OBSTACLE_ROUTE_POINT);
        this.pose = pose;
        this.timestampInterval = timestampInterval;

        // Variables below shall be set after it added to obstacle.
        this.obstacle = null;
        this.index = -1;
    }
}
