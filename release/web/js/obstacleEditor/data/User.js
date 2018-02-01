var UserEvent = 
{
    SCENE_OBJECT_SELECTED: "scene object selected",
    ROUTE_POINT_SELECTED: "route point selected",
};

class User extends EventObject
{
    constructor(obstacleManager) {
        super();

        this._obstacleManager = obstacleManager;
        this._selectedSceneObject = null;
        this._selectedRoutePoint = null;

        this._obstacleManager.registerEvent(ObstacleManagerEvent.REMOVED, this, this.onObstacleRemoved);
        this._mainCar = this._obstacleManager.mainCar;
        this._mainCar.registerEvent(ObstacleEvent.ROUTE_POINT_REMOVED, this, this.onRoutePointRemoved);
    }

    selectSceneObject(sceneObject)
    {
        if (this._selectedSceneObject == sceneObject)
        {
            return;
        }

        var originalSelectedSceneObject = this._selectedSceneObject;
        this._selectedSceneObject = sceneObject;

        // Unregister original obstacle event.
        if (originalSelectedSceneObject != null)
        {
            originalSelectedSceneObject.unregisterEvent(SceneObjectEvent.ROUTE_POINT_REMOVED, this, this.onRoutePointRemoved);
        }
        // Add new obstacle listener.
        if (sceneObject != null)
        {
            sceneObject.registerEvent(SceneObjectEvent.ROUTE_POINT_REMOVED, this, this.onRoutePointRemoved);
        }

        this.sendEvent(UserEvent.SCENE_OBJECT_SELECTED, this._selectedSceneObject, originalSelectedSceneObject);

        if (sceneObject == null)
        {
            // If no obstalce is selected, clear some relative data.
            this.selectRoutePoint(null);
        }
        else
        {
            // If new obstacle has no route point, select -1, or select the first one(index of which is 0);
            if (sceneObject.route.points.length == 0)
            {
                this.selectRoutePoint(null);
            }
            else
            {
                this.selectRoutePoint(sceneObject.route.points[0]);
            }
        }
    }

    getSelectedSceneObject()
    {
        return this._selectedSceneObject;
    }

    //#region obstacle
    isObstacleSelected()
    {
        return this._selectedSceneObject != null 
        && this._selectedSceneObject.sceneObjectType == SceneObjectType.OBSTACLE;
    }

    selectObstacle(obstacle)
    {
        this.selectSceneObject(obstacle);
    }

    getSelectedObstacle()
    {
        if (this.isObstacleSelected())
        {
            return this._selectedSceneObject;
        }
        else
        {
            return null;
        }
    }

    onObstacleRemoved(sender, obstacle, index)
    {
        // If the removed obstacle is the selected obstacle, select null;
        if (obstacle == this.getSelectedObstacle())
        {
            this.selectObstacle(null);
        }
    }
    //#endregion obstacle

    //#region main cara
    isMainCarSelected()
    {
        return this._selectedSceneObject != null 
        && this._selectedSceneObject.sceneObjectType == SceneObjectType.MAIN_CAR;
    }

    selectMainCar(val)
    {
        if (val)
        {
            this.selectSceneObject(this._mainCar);
        }
        else
        {
            this.selectSceneObject(null);
        }
    }
    //#endregion main cara

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
        if (routePoint == this.getSelectedRoutePoint())
        {
            this.selectRoutePoint(null);
        }
    }

    clear()
    {
        this.selectSceneObject(null);
    }
}