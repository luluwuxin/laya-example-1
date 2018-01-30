function AskPopupWindowScript(content, caller, yesMethod, noMethod)
{
    AskPopupWindowScript.super(this);

    this.content.text = content;
    this.yesButton.on(Event.CLICK, this, function()
    {
        this.close();
        yesMethod.call(caller);
    });
    this.noButton.on(Event.CLICK, this, function()
    {
        this.close();
        noMethod.call(caller);
    });
}
Laya.class(AskPopupWindowScript, "AskPopupWindowScript", AskPopupWindowUI);