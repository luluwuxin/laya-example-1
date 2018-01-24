class ObjectHelper
{
    static clone(from, to = null)
    {
        var ret = {};
        if (to != null)
        {
            ret = to;
        }
        for (var key in from)
        {
            ret[key] = from[key];
        }
        return ret;
    }

    static swallowMouseDown(obj)
    {
        obj.on(Event.MOUSE_DOWN, null, function(event)
        {
            event.stopPropagation();
        });
    }

    static swallowScrollMouseDown(obj)
    {
        ObjectHelper.swallowMouseDown(obj.upButton);
        ObjectHelper.swallowMouseDown(obj.downButton);
        ObjectHelper.swallowMouseDown(obj.slider);
        ObjectHelper.swallowMouseDown(obj.slider.bar);
    }
}