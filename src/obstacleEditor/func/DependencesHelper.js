class DependencesHelper
{
    static _putDenpendencesToObject(obj)
    {
        for (var key in obj._dependences)
        {
            obj["_" + key] = obj._dependences[key];
        }
    }

    static setDependences(obj, dependences)
    {
        obj._dependences = ObjectHelper.clone(dependences);
        DependencesHelper._putDenpendencesToObject(obj);
    }

    static setDependencesByParent(obj, parent, parentName)
    {
        obj._dependences = ObjectHelper.clone(parent._dependences);
        obj._dependences[parentName] = parent;
        DependencesHelper._putDenpendencesToObject(obj);
    }
}