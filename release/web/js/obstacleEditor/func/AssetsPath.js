class AssetsPath
{
    static getMapConfigFilePath(mapName)
    {
        return AssetsPath.getMapDirectory(mapName) + "/" + "config.json";
    }

    static getMapDirectory(mapName)
    {
        return "Scenes" + "/" + mapName;
    }
}