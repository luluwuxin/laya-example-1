var Keyboard = laya.events.Keyboard;
var KeyBoardManager = laya.events.KeyBoardManager;
class KeyboardEventsManager extends EventObject
{
    constructor()
    {
        super();
        this._viceKeys = new Set
        ([
            Keyboard.CONTROL,
            Keyboard.ALTERNATE,
            Keyboard.SHIFT,
        ]);
        Laya.stage.on(Event.KEY_DOWN, this, this._onKeyDown);
    }
    
    _isViceKey(keyCode)
    {
        return this._viceKeys.has(keyCode);
    }

    _getCurrentViceKey()
    {
        for (var viceKey of this._viceKeys)
        {
            if (KeyBoardManager.hasKeyDown(viceKey))
            {
                return viceKey;
            }
        }
        return null;
    }

    _getKeyEvent(mainKey, viceKey = null)
    {
        return "[" + mainKey + "]" + "[" + viceKey + "]";
    }

    _onKeyDown(event)
    {
        var keyCode = event.keyCode;

        if (this._isViceKey(keyCode))
        {
            return;
        }
        var viceKey = this._getCurrentViceKey();
        this.sendEvent(this._getKeyEvent(keyCode, viceKey));
    }

    registerKeyEvent(mainKey, caller, method, viceKey = null)
    {
        var event = this._getKeyEvent(mainKey, viceKey);
        this.clearEvent(event);
        this.registerEvent(event, caller, method);
    }
}