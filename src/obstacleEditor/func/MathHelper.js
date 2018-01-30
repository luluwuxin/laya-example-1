"use strict";

function MathHelper()
{
}

MathHelper.normalizeValue = function (val, range)
{
    val = val % range;
    if (val < 0)val += range;
    return val;
};

MathHelper.normalizeRadian = function (radian)
{
    return MathHelper.normalizeValue(radian, Math.PI * 2);
};

MathHelper.normalizeDegree = function (degree)
{
    return MathHelper.normalizeValue(degree, 360);
};
