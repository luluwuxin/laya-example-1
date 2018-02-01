class RoutePointLinkLineView
{
    constructor(obstacleUI, routePoint, container)
    {
        DependencesHelper.setDependencesByParent(this, obstacleUI, "obstacleUI");
        this._routePoint = routePoint;
        this._sprite = new Laya.Sprite();
        container.addChild(this._sprite);

        routePoint.registerEvent(RoutePointEvent.LINK_LINE_CHANGED, this, this.onLinkLineChanged);

        this.refreshLine();
    }

    destroy()
    {
        this._sprite.destroy();
        this._sprite = null;
    }

    refreshLine ()
    {
        var bezierCurve = this._routePoint.bezierCurve;
        this._sprite.graphics.clear();

        if (bezierCurve == null)
        {
            return;
        }
        
        var mapData = this._loadedDataManager.mapData;

        var drawCount = 20;
        var points = [];
        for (var i = 0; i <= drawCount; i++)
        {
            var p = mapData.mapToUIPosition(bezierCurve.getPointInfo(i / drawCount));
            points.push(p.x, p.y);
        }
        this._sprite.graphics.drawLines(0, 0, points, "#000000", 2);
    }

    onLinkLineChanged(sender, bezierCurve)
    {
        this.refreshLine(bezierCurve);
    }
}