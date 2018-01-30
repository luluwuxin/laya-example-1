class MainCarSEPoint2D extends ObjectPoint
{
    constructor(mapData = null, pose = new Pose(), pointType)
    {
        super(pointType);
        this.x = pose.vec3.x;
        this.y = pose.vec3.y;
        if (mapData != null)
        {
            this.z = mapData.mapInfo.objectZ;
        }
        else
        {
            this.z = 0;
        }
        this.rotation = Math.atan2(pose.quat.z, pose.quat.w) * 2 / Math.PI * 180;
    }

    toJson()
    {
        var rad = this.rotation / 180 * Math.PI;
        return {
            "quat": {
                "x": 0,
                "y": 0,
                "z": Math.sin(rad / 2),
                "w": Math.cos(rad / 2)
            },
            "tran": {
                "x": this.x,
                "y": this.y,
                "z": this.z
            }
        };
    }
}