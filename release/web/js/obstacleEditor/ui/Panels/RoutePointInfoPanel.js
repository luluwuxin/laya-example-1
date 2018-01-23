function RoutePointInfoPanelScript(dependences)
{
    // unitRatio = display value / actual value
    var pointProperties = {
        "x": {unitRatio: 0.01},
        "y": {unitRatio: 0.01},
        "rotation": {unitRatio: 1},
        "timestampInterval": {unitRatio: 1},
        "speed": {unitRatio: 0.01}
    };

    //#region event callback
    function onRoutePointSelected(sender, routePoint, oriRoutePoint)
    {
        if (oriRoutePoint != null)
        {
            oriRoutePoint.unregisterEvent(ObjectEvent.VALUE_CHANGED, this, onRoutePointChanged);
        }

        if (routePoint != null)
        {
            routePoint.registerEvent(ObjectEvent.VALUE_CHANGED, this, onRoutePointChanged);
        }
        this.setRoutePointInfo(routePoint);
    }

    function onReversingCheckBoxClick()
    {
        this._user.getSelectedRoutePoint().setValue("isReversing", this.reversingCheckBox.selected);
    }

    function onLockTypeSelected(sender)
    {
        var comboBox = sender.currentTarget;
        var routePoint = this._user.getSelectedRoutePoint();
        routePoint.setValue("lockType", comboBox.selectedLabel);
    }

    function onRoutePointChanged(sender, keys)
    {
        this.setRoutePointInfo(sender, keys);
    }

    function onRoutePointEdited(key, sender)
    {
        var routePoint = this._user.getSelectedRoutePoint();
        var ratio = 1;
        if (key in pointProperties)
        {
            ratio = pointProperties[key].unitRatio;
        }
        routePoint.setValue(key, Number(sender.text) / ratio);
    }

    //#endregion event callback
    this.setRoutePointInfo = function(routePoint, keys)
    {    
        if (routePoint == null)
        {
            this.contentPanel.visible = false;
        }
        else
        {
            this.contentPanel.visible = true;

            function setTextValueToInput (key)
            {
                this[key + "Input"].text = (routePoint[key] * pointProperties[key].unitRatio).toFixed(3).toString();
            }

            if (keys == null)
            {
                for (var k in pointProperties)
                {
                    setTextValueToInput.call(this, k);
                }
            }
            else
            {
                for (var k of keys)
                {
                    if (k in pointProperties)
                    {
                        setTextValueToInput.call(this, k);
                    }
                }
            }

            if (keys == null || keys.has("timestampInterval"))
            {
                this.timestampValueLabel.text = routePoint.getTimestampSec().toFixed(3).toString();
            }

            if (keys == null || keys.has("isReversing"))
            {
                this.reversingCheckBox.selected = routePoint.isReversing;
            }

            if (keys == null || keys.has("lockType"))
            {
                this.lockTypeComboBox.selectedLabel = routePoint.lockType;
            }
        }
    }

    //#region constructor
    RoutePointInfoPanelScript.super(this);
    
    // member variable
    DependencesHelper.setDependences(this, dependences);

    // init ui
    UIHelper.setComboLabels(this.lockTypeComboBox, RoutePointLockType);

    // event
    this._user.registerEvent(UserEvent.ROUTE_POINT_SELECTED, this, onRoutePointSelected);
    for (var property in pointProperties)
    {
        this[property + "Input"].on(Event.ENTER, this, onRoutePointEdited, [property]);
        this[property + "Input"].on(Event.BLUR, this, onRoutePointEdited, [property]);
    }
    this.reversingCheckBox.dataSource = {};
    this.reversingCheckBox.on(Event.CLICK, this, onReversingCheckBoxClick);
    this.lockTypeComboBox.on(Event.CHANGE, this, onLockTypeSelected);

    this.setRoutePointInfo(this._user.getSelectedRoutePoint());
    //#endregion constructor
}
Laya.class(RoutePointInfoPanelScript, "RoutePointInfoPanelUI", RoutePointInfoPanelUI);