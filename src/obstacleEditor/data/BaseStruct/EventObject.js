var ObjectEvent = 
{
    VALUE_CHANGED: "value changed"
};

class EventObject extends BaseObject
{
    constructor()
    {
        super();
        this._eventManager = new EventsManager();
    }

    clearEvent (event)
    {
        this._eventManager.clearEvent(event);
    }

    registerEvent (event, caller, method, ...args)
    {
        this._eventManager.registerEvent(event, caller, method, ...args);
    }

    unregisterEvent (event, caller, method)
    {
        this._eventManager.unregisterEvent(event, caller, method);
    }

    sendEvent (event, ...args)
    {
        this._eventManager.sendEvent(event, this, ...args);
    }

    setValue(...kvPair)
    {
        var keys = new Set();
        for (var i = 0; i < kvPair.length; i += 2)
        {
            if (ValueHelper.equal(this[kvPair[i]], kvPair[i + 1]))
            {
                continue;
            }
            this[kvPair[i]] = kvPair[i + 1];
            keys.add(kvPair[i]);
        }
        if (keys.size > 0)
        {
            this.sendEvent(ObjectEvent.VALUE_CHANGED, keys);
        }
        return keys;
    }

    
}
