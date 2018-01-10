function openUrl(url)
{
	var  cmd = '';
    switch (process.platform) {
    case 'win32':
        cmd = 'start';
        break;
    case 'linux':
        cmd = 'xdg-open';
        break;
    case 'darwin':
        cmd = 'open';
        break;
    default:
        return;
    }
    console.log("os:"+process.platform + " | "+ cmd+ ' ' + url);
    var child_process = require("child_process");
    child_process.exec(cmd + ' ' + url);    
}

exports.openUrl = openUrl;