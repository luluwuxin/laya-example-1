class MainCarRoutePointLinkLineView extends RoutePointLinkLineView
{
    constructor(obstacleUI, routePoint, container)
    {
        super(obstacleUI, routePoint, container);
    }

    refreshLine ()
    {
        this._sprite.graphics.clear();

        var mapData = this._loadedDataManager.mapData;
        var nextPoint = this._routePoint.nextRoutePoint();
        if (nextPoint == null)
        {
            return;
        }
        var startP = mapData.mapToUIPosition({x: this._routePoint.x, y: this._routePoint.y});
        var endP = mapData.mapToUIPosition({x: nextPoint.x, y: nextPoint.y});
        this._sprite.graphics.drawLine(startP.x, startP.y, endP.x, endP.y, "#000000", 2);
    }
}