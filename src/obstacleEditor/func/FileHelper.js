"use strict";

function FileHelper()
{
}

FileHelper.readFile = function (filePath, caller, method)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filePath, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                method.call(caller, allText);
            }
        }
    }
    rawFile.send(null);
};

FileHelper.createAndDownloadFile = function (fileName, content)
{
    var aTag = document.createElement('a');
    var blob = new Blob([content]);
    aTag.download = fileName;
    aTag.href = URL.createObjectURL(blob);
    aTag.click();
    URL.revokeObjectURL(blob);
};
