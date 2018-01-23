class MapData
{
    constructor(mapInfo, mapImagePath)
    {
        this.mapInfo = mapInfo;
        this.mapImagePath = mapImagePath;
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
}