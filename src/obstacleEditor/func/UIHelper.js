class UIHelper
{
    static setComboLabels(comboBox, enumList)
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
    }
}