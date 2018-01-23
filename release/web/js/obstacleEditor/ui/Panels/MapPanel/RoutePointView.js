function RoutePointViewScript(obstacleUI, routePoint)
{
    function onRoutePointValueChanged(sender, keys)
    {
        this.update(keys);
    }

    function onRoutePointSelected(sender, routePoint, oriRoutePoint)
    {
        if (oriRoutePoint === this._routePoint)
        {
            this._onSelected(false);
        }

        if (routePoint === this._routePoint)
        {
            this._onSelected(true);
        }
    }

    //#region drag mode
    function onMouseDownDragMode(event)
    {
        this._user.selectObstacle(this._routePoint.obstacle);
        this._user.selectRoutePoint(this._routePoint);
        event.stopPropagation();
        this.inDraggingMode = false;
        this.watchMouseMoveDragMode(true);
        this._initMoveOffsetX = this.x - this._obstacleUI.obstacleContainer.mouseX;
        this._initMoveOffsetY = this.y - this._obstacleUI.obstacleContainer.mouseY;
    }

    function onMouseUpDragMode()
    {
        this.stopDragging();
    }

    function onMouseMoveDragMode()
    {
        this.inDraggingMode = true;
        this._historyManager.disableRecordHistory();
        this.followMouse();
    }

    function onMouseOutDragMode()
    {
        this.stopDragging();
    }

    this.stopDragging = function()
    {
        if (this.inDraggingMode)
        {
            this.inDraggingMode = false;
            this._historyManager.enableRecordHistory();
        }
        this.watchMouseMoveDragMode(false);
    }

    this.watchMouseMoveDragMode = function(val)
    {
        if (val)
        {
            this._mapPanelScript.mainContainer.on(Event.MOUSE_MOVE, this, onMouseMoveDragMode);
            this._mapPanelScript.mainContainer.on(Event.MOUSE_OUT, this, onMouseOutDragMode);
            this._mapPanelScript.mainContainer.on(Event.MOUSE_UP, this, onMouseUpDragMode);
        }
        else
        {
            this._mapPanelScript.mainContainer.off(Event.MOUSE_MOVE, this, onMouseMoveDragMode);
            this._mapPanelScript.mainContainer.off(Event.MOUSE_OUT, this, onMouseOutDragMode);
            this._mapPanelScript.mainContainer.off(Event.MOUSE_UP, this, onMouseUpDragMode);
        }
    }

    this.followMouse = function()
    {
        var targetX = this._obstacleUI.obstacleContainer.mouseX + this._initMoveOffsetX;
        var targetY = this._obstacleUI.obstacleContainer.mouseY + this._initMoveOffsetY;
        var pos = this._loadedDataManager.mapData.uiToMapPosition({x: targetX, y: targetY});
        this._routePoint.setValue("x", pos.x, "y", pos.y);
    }
    //#endregion drag mode

    //#region rotation mode
    function onMouseDownRotationMode(event)
    {
        event.stopPropagation();
        this.inRotationMode = true;
        this.watchMouseMoveRotationMode(true);
        this._initMouseRadianRotationMode = this.getCurrentMouseRadian();
        this._initRotationRotationMode = this._routePoint.rotation;
        
    }

    function onMouseUpRotationMode()
    {
        this.stopRotation();
    }

    function onMouseMoveRotationMode()
    {
        this.inRotationMode = true;
        this._historyManager.disableRecordHistory();
        var radian = this.getCurrentMouseRadian();
        var deltaRadian = radian - this._initMouseRadianRotationMode;
        var targetRotation = deltaRadian * 180 / Math.PI + this._initRotationRotationMode;
        targetRotation = MathHelper.normalizeDegree(targetRotation);
        this._routePoint.setValue("rotation", targetRotation);
    }

    function onMouseOutRotationMode()
    {
        this.stopRotation();
    }

    this.getCurrentMouseRadian = function()
    {
        var offsetX = this.mouseX - this.anchorX * this.width;
        var offsetY = this.mouseY - this.anchorY * this.height;
        return Math.atan2(offsetY, offsetX);
    }

    this.stopRotation = function()
    {
        this.inRotationMode = false;
        this._historyManager.enableRecordHistory();
        this.watchMouseMoveRotationMode(false);
    }

    this.watchMouseMoveRotationMode = function(val)
    {
        if (val)
        {
            this._mapPanelScript.mainContainer.on(Event.MOUSE_MOVE, this, onMouseMoveRotationMode);
            this._mapPanelScript.mainContainer.on(Event.MOUSE_OUT, this, onMouseOutRotationMode);
            this._mapPanelScript.mainContainer.on(Event.MOUSE_UP, this, onMouseUpRotationMode);
        }
        else
        {
            this._mapPanelScript.mainContainer.off(Event.MOUSE_MOVE, this, onMouseMoveRotationMode);
            this._mapPanelScript.mainContainer.off(Event.MOUSE_OUT, this, onMouseOutRotationMode);
            this._mapPanelScript.mainContainer.off(Event.MOUSE_UP, this, onMouseUpRotationMode);
        }
    }
    //#endregion rotation mode
    
    this.destroy = function()
    {
        Object.getPrototypeOf(this).destroy.call(this);
        this._routePoint.unregisterEvent(ObjectEvent.VALUE_CHANGED, this, onRoutePointValueChanged);
        this._user.unregisterEvent(UserEvent.ROUTE_POINT_SELECTED, this, onRoutePointSelected);
    }

    this.update = function(keys)
    {
        var index = this._routePoint.index;
        // index label
        if (keys == null || keys.has("index"))
        {
            this.indexLabel.text = index.toString();
        }

        // position
        if (keys == null || keys.has("x") || keys.has("y"))
        {
            var pos = this._loadedDataManager.mapData.mapToUIPosition({x: this._routePoint.x, y: this._routePoint.y});
            this.x = pos.x;
            this.y = pos.y;
        }

        // rotation
        if (keys == null || keys.has("rotation"))
        {        
            this.arrowImage.rotation = this._routePoint.rotation;
        }
    }

    this._onSelected = function (val)
    {
        this.selectedMark.visible = val;
    }

    RoutePointViewScript.super(this);

    // member variables.

    DependencesHelper.setDependencesByParent(this, obstacleUI, "obstacleUI");

    this._user = this._dependences.user;
    this._routePoint = routePoint;
    this.anchorX = 0.5;
    this.anchorY = 0.5;

    this._onSelected(false);
    
    this._routePoint.registerEvent(ObjectEvent.VALUE_CHANGED, this, onRoutePointValueChanged);
    this._user.registerEvent(UserEvent.ROUTE_POINT_SELECTED, this, onRoutePointSelected);
    this.dragButton.on(Event.MOUSE_DOWN, this, onMouseDownDragMode);
    this.rotationButton.on(Event.MOUSE_DOWN, this, onMouseDownRotationMode);
}
Laya.class(RoutePointViewScript, "RoutePointViewUI", RoutePointViewUI);