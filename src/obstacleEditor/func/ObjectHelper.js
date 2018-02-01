class ObjectHelper
{
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

    static objectCheck(obj, key, value)
    {
        if (obj == null)
        {
            return null;
        }
        if (key in obj && obj[key] == value)
        {
            return obj;
        }
        else
        {
            return null;
        }
    }
}