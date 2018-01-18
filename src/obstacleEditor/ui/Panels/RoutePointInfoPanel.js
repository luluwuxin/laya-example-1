function RoutePointInfoPanelScript(dependences)
{
    var pointProperties = new Set(["x", "y", "rotation", "timestampFromPrevPoint"]);

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

    function onRoutePointChanged(sender, keys)
    {
        this.setRoutePointInfo(sender, keys);
    }

    function onRoutePointEdited(key, sender)
    {
        var routePoint = this._user.getSelectedRoutePoint();
        routePoint.setValue(key, Number(sender.text));
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
            if (keys == null)
            {
                for (var k of pointProperties)
                {
                    this[k + "Input"].text = routePoint[k].toString();
                }
            }
            else
            {
                for (var k of keys)
                {
                    if (pointProperties.has(k))
                    {
                        this[k + "Input"].text = routePoint[k].toString();
                    }
                }
            }

            if (keys == null || keys.has("timestampFromPrevPoint"))
            {
                this.timestampValueLabel.text = routePoint.getTimestampSec().toString();
            }

            if (keys == null || keys.has("isReversing"))
            {
                this.reversingCheckBox.selected = routePoint.isReversing;
            }
        }
    }

    //#region constructor
    RoutePointInfoPanelScript.super(this);
    
    // member variable
    DependencesHelper.setDependences(this, dependences);

    // init ui
    
    // event
    this._user.registerEvent(UserEvent.ROUTE_POINT_SELECTED, this, onRoutePointSelected);
    for (var property of pointProperties)
    {
        this[property + "Input"].on(Event.ENTER, this, onRoutePointEdited, [property]);
        this[property + "Input"].on(Event.BLUR, this, onRoutePointEdited, [property]);
    }
    this.reversingCheckBox.dataSource = {};
    this.reversingCheckBox.on(Event.CLICK, this, onReversingCheckBoxClick);

    this.setRoutePointInfo(this._user.getSelectedRoutePoint());
    //#endregion constructor
}
Laya.class(RoutePointInfoPanelScript, "RoutePointInfoPanelUI", RoutePointInfoPanelUI);