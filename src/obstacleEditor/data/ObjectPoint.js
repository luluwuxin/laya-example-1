var ObjectPointType = {
    OBSTACLE_ROUTE_POINT: "obstacle route point",
    MAIN_CAR_ROUTE_POINT: "main car route point",
    MAIN_CAR_START_POINT: "main car start point",
    MAIN_CAR_END_POINT: "main car end point"
};

class ObjectPoint extends EventObject
{
    constructor(pointType)
    {
        super();
        this.pointType = pointType;
    }
}