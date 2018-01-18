class Quat
{
    constructor(x = 0, y = 0, z = 0, w = 1)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    static fromJson(jsonObj)
    {
        var ret = new Quat();
        ret.x = jsonObj.x;
        ret.y = jsonObj.y;
        ret.z = jsonObj.z;
        ret.w = jsonObj.w;
        return ret;
    }
}

class Vec3
{
    constructor(x = 0, y = 0, z = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static fromJson(jsonObj)
    {
        var ret = new Vec3();
        ret.x = jsonObj.x;
        ret.y = jsonObj.y;
        ret.z = jsonObj.z;
        return ret;
    }
}

class Pose
{
    constructor(quat = new Quat(), vec3 = new Vec3())
    {
        this.quat = quat;
        this.vec3 = vec3;
    }
}