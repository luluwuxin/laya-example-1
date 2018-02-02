var proc = require("child_process");

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
    proc.exec(cmd + ' ' + url);    
}

function openRos()
{
	var  cmd = 'rosrun adsim pub_cybertron& python ~/catkin_ws/bin/topic.py';
    proc.exec(cmd);    
}

exports.openUrl = openUrl;
exports.openRos = openRos;
