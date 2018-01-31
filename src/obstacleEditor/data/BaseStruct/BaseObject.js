var _baseObjectUniqueIDCreator = 0;
class BaseObject
{
    constructor()
    {
        this._uniqueID = _baseObjectUniqueIDCreator++;
    }

    getUniqueID()
    {
        return this._uniqueID;
    }
}