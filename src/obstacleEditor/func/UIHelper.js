"use strict";

function UIHelper()
{
}

UIHelper.setComboLabels = function (comboBox, enumList)
{
    var typeListString = "";
    for (var key in enumList)
    {
        if (typeListString != "")
        {
            typeListString += ",";
        }
        typeListString += enumList[key];
    }
    comboBox.labels = typeListString;
};
