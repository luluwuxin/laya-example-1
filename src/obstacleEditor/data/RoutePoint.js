class RoutePoint extends EventObject
{
    constructor(pose = new Pose(), timestampFromPrevPoint = 0)
    {
        super();
        this.pose = pose;
        this.timestampFromPrevPoint = timestampFromPrevPoint;

        // Variables below shall be set after it added to obstacle.
        this.obstacle = null;
        this.index = -1;
    }
}
