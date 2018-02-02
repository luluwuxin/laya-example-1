"use strict";function CameraMoveScript(){CameraMoveScript.super(this),this.lastMouseX=NaN,this.lastMouseY=NaN,this.yawPitchRoll=new Laya.Vector3,this.tempRotationZ=new Laya.Quaternion,this.isMouseDown=!1,this.rotaionSpeed=6e-4,this.origin=new Laya.Vector3(0,0,0),this.mainCameraAnimation=null,this.scene=null}Laya.class(CameraMoveScript,"CameraMoveScript",Laya.Script),CameraMoveScript.prototype._initialize=function(t){var a=t.parent.parent;CameraMoveScript.__super.prototype._initialize.call(this,t),a.on("mousedown",this,this.mouseDown),a.on("mouseup",this,this.mouseUp),a.on("mouseout",this,this.mouseOut),a.on("mousewheel",this,this.mouseWheel),this.camera=t},CameraMoveScript.prototype._update=function(t){CameraMoveScript.__super.prototype._update.call(this,t),this.updateCamera(t.elapsedTime)},CameraMoveScript.prototype.updateCamera=function(t){if(!isNaN(this.lastMouseX)&&!isNaN(this.lastMouseY)){this.owner.scene;if(this.isMouseDown){var a=Laya.stage.mouseX-this.lastMouseX,e=Laya.stage.mouseY-this.lastMouseY,o=this.yawPitchRoll.elements;o[0]-=a*this.rotaionSpeed*t,o[1]-=e*this.rotaionSpeed*t,this.updateRotation()}}this.lastMouseX=Laya.stage.mouseX,this.lastMouseY=Laya.stage.mouseY},CameraMoveScript.prototype.updateRotation=function(){var t=this.yawPitchRoll.elements;if(Math.abs(t[1])<1.5){Laya.Quaternion.createFromYawPitchRoll(t[0],t[1],t[2],this.tempRotationZ),this.camera.transform.localRotation=this.tempRotationZ;var a=Laya.Vector3.distance(this.origin,this.camera.transform.position),e=this.camera.transform.forward;e.x*=-a,e.y*=-a,e.z*=-a,this.camera.transform.position=e}},CameraMoveScript.prototype.mouseDown=function(t){this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll),this.lastMouseX=Laya.stage.mouseX,this.lastMouseY=Laya.stage.mouseY,this.isMouseDown=!0},CameraMoveScript.prototype.mouseUp=function(t){this.isMouseDown=!1},CameraMoveScript.prototype.mouseOut=function(t){this.isMouseDown=!1},CameraMoveScript.prototype.mouseWheel=function(t){var a=Laya.Vector3.distance(this.origin,this.camera.transform.position),e=this.camera.transform.forward;a*=1+.05*t.delta,e.x*=-a,e.y*=-a,e.z*=-a,this.camera.transform.position=e};