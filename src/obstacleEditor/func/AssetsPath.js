"use strict";

function AssetsPath()
{
}

AssetsPath.getMapConfigFilePath = function (mapName)
{
    return AssetsPath.getMapDirectory(mapName) + "/" + "config.json";
};

AssetsPath.getMapDirectory = function (mapName)
{
    return "Scenes" + "/" + mapName;
};
