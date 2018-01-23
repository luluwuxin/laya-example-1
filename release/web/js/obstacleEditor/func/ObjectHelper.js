class ObjectHelper
{
    static clone(obj)
    {
        var ret = {};
        for (var key in obj)
        {
            ret[key] = obj[key];
        }
        return ret;
    }
}