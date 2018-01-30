"use strict";

function DependencesHelper()
{
}

DependencesHelper._putDenpendencesToObject = function (obj)
{
    for (var key in obj._dependences)
    {
        obj["_" + key] = obj._dependences[key];
    }
};

DependencesHelper.setDependences = function (obj, dependences)
{
    obj._dependences = Object.assign({}, dependences);
    DependencesHelper._putDenpendencesToObject(obj);
};

DependencesHelper.setDependencesByParent = function (obj, parent, parentName)
{
    obj._dependences = Object.assign({}, parent._dependences);
    obj._dependences[parentName] = parent;
    DependencesHelper._putDenpendencesToObject(obj);
};
