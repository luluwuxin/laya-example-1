var ObstacleManagerEvent = 
{
    ADDED: "obstacle added",
    REMOVED: "obstacle removed"
};
class ObstacleManager extends EventObject
{
    constructor() {
        super();

        this.mainCar = new MainCar();
        this._obstacles = [];
    }

    _createObstacleName()
    {
        var indexes = new Set();
        for (var obstacle of this._obstacles)
        {
            var index = obstacle.name.indexOf("obstacle-");
            if (index != 0)
            {
                continue;
            }
            var num = Number(obstacle.name.substring(9));
            if (isNaN(num) == false)
            {
                indexes.add(num);
            }
        }
        for (var i = 0; ; i++)
        {
            if (indexes.has(i))
            {
                continue;
            }
            return "obstacle-" + i;
        }
    }

    getMainCar()
    {
        return this.mainCar;
    }

    getObstacles()
    {
        return this._obstacles;
    }

    getObstacle(index)
    {
        return this._obstacles[index];
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

    addDefaultObstacle(obstacleType)
    {
        var defaultObject = new Obstacle();
        defaultObject.type = obstacleType;
        defaultObject.name = this._createObstacleName();
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
        return {
            "obstacles": obstaclesJsonObj,
            "mainCar": this.mainCar.toJson()
        };
    }
}
