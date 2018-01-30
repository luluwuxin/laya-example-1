"use strict";

function ObjectHelper()
{
}

ObjectHelper.swallowMouseDown = function (obj)
{
    obj.on(Event.MOUSE_DOWN, null, function(event)
    {
        event.stopPropagation();
    });
};

ObjectHelper.swallowScrollMouseDown = function (obj)
{
    ObjectHelper.swallowMouseDown(obj.upButton);
    ObjectHelper.swallowMouseDown(obj.downButton);
    ObjectHelper.swallowMouseDown(obj.slider);
    ObjectHelper.swallowMouseDown(obj.slider.bar);
};
