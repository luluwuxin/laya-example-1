function openUrl(b){switch(process.platform){case "win32":var a="start";break;case "linux":a="xdg-open";break;case "darwin":a="open";break;default:return}console.log("os:"+process.platform+" | "+a+" "+b);require("child_process").exec(a+" "+b)}exports.openUrl=openUrl;