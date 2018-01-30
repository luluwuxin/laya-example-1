class MainCarRoutePoint2D extends ObjectPoint
{
    constructor(mapData = null, x = 0, y = 0)
    {
        super(ObjectPointType.MAIN_CAR_ROUTE_POINT);
        this.x = x;
        this.y = y;
        if (mapData != null)
        {
            this.z = mapData.mapInfo.objectZ;
        }
        else
        {
            this.z = 0;
        }
    }

    toJson()
    {
        return {
            "x": this.x,
            "y": this.y,
            "z": this.z
        };
    }
}