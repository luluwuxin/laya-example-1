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
        this.changeRoutePoint(routePoint, oriRoutePoint);
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

    this._refreshObstacleRoutePointTotalTime = function (routePoint)
    {
        this.timestampValueLabel.text = routePoint.getTimestampSec().toFixed(3).toString();
    }

    this._showUIByRoutePoint = function(routePoint)
    {
        var opt = ObjectPointType;
        var pointType = routePoint.pointType;
        this.xBox.visible = true;
        this.yBox.visible = true;
        this.rotationBox.visible = pointType == opt.OBSTACLE_ROUTE_POINT || pointType == opt.MAIN_CAR_START_POINT;
        this.timeInterBox.visible = pointType == opt.OBSTACLE_ROUTE_POINT;
        this.speedBox.visible = pointType == opt.OBSTACLE_ROUTE_POINT;
        this.lockTypeBox.visible = pointType == opt.OBSTACLE_ROUTE_POINT;
        this.totalTimeBox.visible = pointType == opt.OBSTACLE_ROUTE_POINT;
        this.reversingBox.visible = pointType == opt.OBSTACLE_ROUTE_POINT;
    }

    this.changeRoutePoint = function(routePoint, oriRoutePoint)
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

    this.setRoutePointInfo = function(routePoint, keys)
    {    
        if (routePoint == null)
        {
            this.contentPanel.visible = false;
        }
        else
        {
            this.contentPanel.visible = true;
            this._showUIByRoutePoint(routePoint);

            // Actually, the "total time" shall be refreshed when any point before this routePoint is changing.
            // But in this panel, this routePoint must be the selected one, in this case, other points can't be modified,
            // but only can be removed, then the index of this routePoint will be changed.
            // So, it's OK that we only refresh the "total time" when any value of THIS routePoint is changed,
            // and do not care about OTHER routePoint's changing.
            // If in the future, other points can be modified, add a timer.loop to refresh it.
            if (routePoint.pointType == ObjectPointType.OBSTACLE_ROUTE_POINT)
            {
                this._refreshObstacleRoutePointTotalTime(routePoint);
            }

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

            if (keys == null && "isReversing" in routePoint || keys != null && keys.has("isReversing"))
            {
                this.reversingCheckBox.selected = routePoint.isReversing;
            }

            if (keys == null && "lockType" in routePoint || keys != null && keys.has("lockType"))
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
Laya.class(RoutePointInfoPanelScript, "RoutePointInfoPanelScript", RoutePointInfoPanelUI);