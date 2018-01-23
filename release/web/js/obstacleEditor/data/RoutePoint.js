class RoutePoint extends EventObject
{
    constructor(pose = new Pose(), timestampInterval = 0)
    {
        super();
        this.pose = pose;
        this.timestampInterval = timestampInterval;

        // Variables below shall be set after it added to obstacle.
        this.obstacle = null;
        this.index = -1;
    }
}
