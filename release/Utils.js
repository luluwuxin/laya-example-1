var proc=require("child_process");function openUrl(b){switch(process.platform){case "win32":var a="start";break;case "linux":a="xdg-open";break;case "darwin":a="open";break;default:return}console.log("os:"+process.platform+" | "+a+" "+b);proc.exec(a+" "+b)}function openRos(){"linux"==process.platform&&proc.exec("rosrun adsim pub_cybertron& python ~/catkin_ws/bin/topic.py")}exports.openUrl=openUrl;exports.openRos=openRos;
