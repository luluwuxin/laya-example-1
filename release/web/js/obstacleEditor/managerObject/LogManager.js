(function()
{
    var logLevelList = {
        Debug: -1,
        Info: 0,
        Warning: 1,
        Error: 2,
        Temp: 999
    };

    var logLevel = logLevelList.Info;
    class LogManager
    {
        log(logType, message)
        {
            console.log(logType + ": " + message);
        }
    }
    var logManager = new LogManager();

    // logTemp shall be deleted before commit.
    this.logTemp = function(msg)
    {
        if (logLevel > logLevelList.Temp) return;
        logManager.log("Temp", msg);
    }
    this.logDebug = function(msg)
    {
        if (logLevel > logLevelList.Debug) return;
        logManager.log("Debug", msg);
    }
    this.logInfo = function(msg)
    {
        if (logLevel > logLevelList.Info) return;
        logManager.log("Info", msg);
    }
    this.logWarning = function(msg)
    {
        if (logLevel > logLevelList.Warning) return;
        logManager.log("Warning", msg);
    }
    this.logError = function(msg)
    {
        if (logLevel > logLevelList.Error) return;
        logManager.log("Error", msg);
    }

    this.assert = function(val, msg)
    {
        if (val == false)
        {
            this.logError(msg);
        }
    }
})();
