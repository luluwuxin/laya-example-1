var UserEvent = 
{
    OBSTACLE_SELECTED: "obstacle selected",
    ROUTE_POINT_SELECTED: "route point selected"
};

class User extends EventObject
{
    constructor(obstacleManager) {
        super();

        this._obstacleManager = obstacleManager;
        this._selectedObstacle = null;
        this._selectedRoutePoint = null;

        this._obstacleManager.registerEvent(ObstacleManagerEvent.ADDED, this, this.onObstacleAdded);
        this._obstacleManager.registerEvent(ObstacleManagerEvent.REMOVED, this, this.onObstacleRemoved);
    }

    selectObstacle(obstacle)
    {
        if (this._selectedObstacle == obstacle)
        {
            return;
        }

        var originalSelectedObstacle = this._selectedObstacle;
        this._selectedObstacle = obstacle;

        // Unregister original obstacle event.
        if (originalSelectedObstacle != null)
        {
            originalSelectedObstacle.unregisterEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, this.onRoutePointRemoved);
            originalSelectedObstacle.unregisterEvent(ObstacleEvent.ROUTE_POINT_ADDED, this, this.onRoutePointAdded);
        }
        // Add new obstacle listener.
        if (obstacle != null)
        {
            obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, this.onRoutePointRemoved);
            obstacle.registerEvent(ObstacleEvent.ROUTE_POINT_ADDED, this, this.onRoutePointAdded);
        }

        this.sendEvent(UserEvent.OBSTACLE_SELECTED, this._selectedObstacle, originalSelectedObstacle);

        if (obstacle == null)
        {
            // If no obstalce is selected, clear some relative data.
            this.selectRoutePoint(null);
        }
        else
        {
            // If new obstacle has no route point, select -1, or select the first one(index of which is 0);
            if (obstacle.route.points.length == 0)
            {
                this.selectRoutePoint(null);
            }
            else
            {
                this.selectRoutePoint(obstacle.route.points[0]);
            }
        }
    }

    getSelectedObstacle()
    {
        return this._selectedObstacle;
    }

    onObstacleRemoved(sender, obstacle, index)
    {
        // If the removed obstacle is the selected obstacle, select null;
        if (obstacle == this._selectedObstacle)
        {
            this.selectObstacle(null);
        }
    }

    onObstacleAdded(sender, obstacle, index)
    {
        // do nothing
    }

    selectRoutePoint(routePoint)
    {
        // select same point, do nothing.
        if (this._selectedRoutePoint == routePoint)
        {
            return;
        }

        var oriRoutePoint = this._selectedRoutePoint;
        this._selectedRoutePoint = routePoint;
        this.sendEvent(UserEvent.ROUTE_POINT_SELECTED, this._selectedRoutePoint, oriRoutePoint);
    }

    getSelectedRoutePoint()
    {
        return this._selectedRoutePoint;
    }

    onRoutePointRemoved(sender, routePoint)
    {
        // If the removed route point is the selected one, select -1;
        if (routePoint == this._selectedRoutePoint)
        {
            this.selectRoutePoint(null);
        }
    }

    onRoutePointAdded(sender, routePoint)
    {
        // do nothing
    }

    clear()
    {
        this.selectObstacle(null);
    }
}