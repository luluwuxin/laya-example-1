var Keyboard = laya.events.Keyboard;
var KeyBoardManager = laya.events.KeyBoardManager;
class KeyboardEventsManager extends EventObject
{
    constructor()
    {
        super();
        this.viceKeys = new Set
        ([
            Keyboard.CONTROL,
            Keyboard.ALTERNATE,
            Keyboard.SHIFT,
        ]);
        Laya.stage.on(Event.KEY_DOWN, this, this.onKeyDown);
    }
    
    isViceKey(keyCode)
    {
        return this.viceKeys.has(keyCode);
    }

    getCurrentViceKey()
    {
        for (var viceKey of this.viceKeys)
        {
            if (KeyBoardManager.hasKeyDown(viceKey))
            {
                return viceKey;
            }
        }
        return null;
    }

    getKeyEvent(mainKey, viceKey = null)
    {
        return "[" + mainKey + "]" + "[" + viceKey + "]";
    }

    onKeyDown(event)
    {
        var keyCode = event.keyCode;

        if (this.isViceKey(keyCode))
        {
            return;
        }
        var viceKey = this.getCurrentViceKey();
        this.sendEvent(this.getKeyEvent(keyCode, viceKey));
    }

    registerKeyEvent(mainKey, caller, method, viceKey = null)
    {
        var event = this.getKeyEvent(mainKey, viceKey);
        this.clearEvent(event);
        this.registerEvent(event, caller, method);
    }
}