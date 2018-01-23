var EventsManagerControl = {
    enable: true
};
class EventsManager
{
    constructor()
    {
        this._registeredEvents = {};
    }

    clearEvent (event = null)
    {
        if (event == null)
        {
            this._registeredEvents = {}
        }
        else
        {
            if (event in this._registeredEvents)
            {
                this._registeredEvents[event] = [];
            }
        }
    }

    registerEvent (event, caller, method, ...args)
    {
        if (!(event in this._registeredEvents))
        {
            this._registeredEvents[event] = [];
        }
        this._registeredEvents[event].push({caller: caller, method: method, args: args});
    }

    unregisterEvent (event, caller, method)
    {
        if (!(event in this._registeredEvents))
        {
            return;
        }
        var methods = this._registeredEvents[event];
        for (var i = methods.length - 1; i >= 0; i--)
        {
            if (methods[i].caller == caller && methods[i].method == method)
            {
                methods.splice(i, 1);
            }
        }
    }

    sendEvent (event, sender, ...args)
    {
        if (EventsManagerControl.enable == false)
        {
            return;
        }
        logDebug("Send event[{0}]".format(event));
        if (!(event in this._registeredEvents))
        {
            return;
        }
        var methods = this._registeredEvents[event];
        for (var i = 0; i < methods.length; i++)
        {
            methods[i].method.call(methods[i].caller, ...methods[i].args, sender, ...args);
        }
    }
}