class MapData
{
    constructor(mapConfig, rootDirectory)
    {
        this.rootDirectory = rootDirectory;
        ObjectHelper.clone(mapConfig, this);

        // Init.
        this.obstacleTypes = [];
        for (var key in this.obstacleInfo)
        {
            this.obstacleTypes.push(key);
        }
    }

    _getPath(relativePath)
    {
        return this.rootDirectory + "/" + relativePath;
    }

    getMapImagePath()
    {
        return this._getPath(this.mapInfo.relativeImagePath);
    }

    mapToUIPosition(mapPosition)
    {
        var ret = {};
        ret.x = (mapPosition.x - this.mapInfo.minX) / (this.mapInfo.maxX - this.mapInfo.minX) * this.mapInfo.width;
        ret.y = (mapPosition.y - this.mapInfo.minY) / (this.mapInfo.maxY - this.mapInfo.minY) * this.mapInfo.height;
        return ret;
    }

    uiToMapPosition(uiPosition)
    {
        var ret = {};
        ret.x = uiPosition.x * (this.mapInfo.maxX - this.mapInfo.minX) / this.mapInfo.width + this.mapInfo.minX;
        ret.y = uiPosition.y * (this.mapInfo.maxY - this.mapInfo.minY) / this.mapInfo.height + this.mapInfo.minY;
        return ret;
    }

    getDefaultObstacleType()
    {
        return this.obstacleTypes[0];
    }

    getObstacleTypes()
    {
        return this.obstacleTypes;
    }

    getObstacleInfo(obstacleType)
    {
        return this.obstacleInfo[obstacleType];
    }

    getObstacleImagePath(obstacleType)
    {
        return this._getPath(this.getObstacleInfo(obstacleType).relativeImagePath);
    }
}