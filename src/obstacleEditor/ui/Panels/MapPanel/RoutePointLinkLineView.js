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
        this._sprite.graphics.clear();

        var point = this._routePoint;
        if (point.index == point.obstacle.getRoutePointCount() - 1)
        {
            return;
        }
        var nextPoint = point.obstacle.getRoutePoint(point.index + 1);
        var p0 = {x: point.x, y: point.y};
        var p3 = {x: nextPoint.x, y: nextPoint.y};
        
        var p12 = RoutePoint2D.getBezierControlPoint(point, nextPoint);
        var p1 = p12[0];
        var p2 = p12[1];
        // Laya can only draw second-order curve, but the data is for third-order.
        // So use two 2nd-order curves to express a 3rd-order curve.
        // WARNING: The curve drawed by this method is a bit different from the really curve!! 
        var pMid = {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2};

        var curve = (function(mapData, ...ps)
        {
            var ret = [];
            for (var p of ps)
            {
                var uiP = mapData.mapToUIPosition(p);
                ret.push(uiP.x);
                ret.push(uiP.y);
            }
            return ret;
        })(this._loadedDataManager.mapData, p0, p1, pMid, p2, p3);

        this._sprite.graphics.drawCurves(0, 0, curve, "#000000", 3);
    }

    onLinkLineChanged()
    {
        this.refreshLine();
    }
}