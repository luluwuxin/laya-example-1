class BezierCurve
{

}

class CubicBezierCurve
{
    constructor(p0, p1, p2, p3)
    {
        this.p = [p0, p1, p2, p3];
    }

    getLength(t = 1)
    {
        var count = 10;
        var step = t / count;
        var len = 0;
        var lastPoint = this.getPointInfo(0);
        for (var i = 1; i <= count; i++)
        {
            var curPoint = this.getPointInfo(i * step);
            len += curPoint.getDis(lastPoint);
            lastPoint = curPoint;
        }
        return len;
    }

    getPointInfo(t)
    {
        var ret = this.p[0].mul((1 - t) * (1 - t) * (1 - t))
            .add(this.p[1].mul(3 * t * (1 - t) * (1 - t)))
            .add(this.p[2].mul(3 * t * t * (1 - t)))
            .add(this.p[3].mul(t * t * t));

        return ret;
    }
}