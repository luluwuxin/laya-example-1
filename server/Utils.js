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
	if(process.platform == 'linux')
		proc.exec(cmd);
}

exports.openUrl = openUrl;
exports.openRos = openRos;

// var date = new Date("2018-03-2 21:00:00");  
// var time = date.getTime()/1000;//转换成秒；
// var data2 = new Date();
// var time2 = data2.getTime()/1000;
// console.log(time);
// console.log(time2);
// console.log((time-time2) / (3600*24));
