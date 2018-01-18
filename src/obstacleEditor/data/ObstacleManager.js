var ObstacleManagerEvent = 
{
    ADDED: "obstacle added",
    REMOVED: "obstacle removed"
};
class ObstacleManager extends EventObject
{
    constructor() {
        super();

        this._obstacles = [];
    }

    getObstacles()
    {
        return this._obstacles;
    }

    getObstacleCount()
    {
        return this._obstacles.length;
    }

    getObstacleIndex(obstacle)
    {
        for (var i = 0; i < this._obstacles.length; i++)
        {
            if (this._obstacles[i] == obstacle)
            {
                return i;
            }
        }
        return -1;
    }

    addDefaultObstacle()
    {
        var defaultObject = new Obstacle();
        defaultObject.type = ObstacleType.CAR;
        defaultObject.name = "car";
        defaultObject.route = new Route();
        this.addObstacle(defaultObject);
        return defaultObject;
    }

    addObstacle(obstacle)
    {
        this._obstacles.push(obstacle);
        var index = this._obstacles.length - 1;
        this.sendEvent(ObstacleManagerEvent.ADDED, obstacle, index);
    }

    removeObstacle(obstacle)
    {
        var index = this.getObstacleIndex(obstacle);
        this._obstacles.splice(index, 1);
        this.sendEvent(ObstacleManagerEvent.REMOVED, obstacle, index);
    }

    getObstacles()
    {
        return this._obstacles;
    }

    clear()
    {
        for (var i = this._obstacles.length - 1; i >= 0; i--)
        {
            this.removeObstacle(this._obstacles[i]);
        }
    }

    toJson()
    {
        var obstaclesJsonObj = [];
        for (var obstacle of this._obstacles)
        {
            obstaclesJsonObj.push(obstacle.toJson());
        }
        return {"obstacles": obstaclesJsonObj};
    }
}
