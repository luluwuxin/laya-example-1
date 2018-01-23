class MathHelper
{
    static normalizeValue(val, range)
    {
        val = val % range;
        if (val < 0)val += range;
        return val;
    }

    static normalizeRadian(radian)
    {
        return MathHelper.normalizeValue(radian, Math.PI * 2);
    }

    static normalizeDegree(degree)
    {
        return MathHelper.normalizeValue(degree, 360);
    }
}