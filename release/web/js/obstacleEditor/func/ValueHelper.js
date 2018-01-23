class ValueHelper
{
    static numberEqual(v0, v1, error = 1e-7)
    {
        return Math.abs(v0 - v1) < error;
    }

    static equal(v0, v1)
    {
        if ((typeof v0) == "number" && (typeof v1) == "number")
        {
            return ValueHelper.numberEqual(v0, v1);
        }
        else
        {
            return v0 == v1;
        }
    }
}