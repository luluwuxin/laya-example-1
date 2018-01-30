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


class Vec2
{
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    mul(val)
    {
        return new Vec2(
            this.x * val,
            this.y * val
        );
    }

    add(vec2)
    {
        return new Vec2(
            this.x + vec2.x,
            this.y + vec2.y
        );
    }

    getDis(vec2 = new Vec2())
    {
        return Math.sqrt(
            (this.x - vec2.x) ** 2
            + (this.y - vec2.y) ** 2
        );
    }

    static fromJson(jsonObj)
    {
        var ret = new Vec2();
        ret.x = jsonObj.x;
        ret.y = jsonObj.y;
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

    mul(val)
    {
        return new Vec3(
            this.x * val,
            this.y * val,
            this.z * val
        );
    }

    add(vec3)
    {
        return new Vec3(
            this.x + vec3.x,
            this.y + vec3.y,
            this.z + vec3.z
        );
    }

    getDis(vec3 = new Vec3())
    {
        return Math.sqrt(
            (this.x - vec3.x) ** 2
            + (this.y - vec3.y) ** 2
            + (this.z - vec3.z) ** 2
        );
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