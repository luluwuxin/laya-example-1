function getObstacleIconByType(type)
{
    switch (type)
    {
    case ObstacleType.CAR:
        return "custom/temp_car.png";
    case ObstacleType.MAN:
        return "custom/temp_man.png";
    case ObstacleType.MAN:
        return "comp/image.png";
    default:
        return "comp/image.png";
    }
}