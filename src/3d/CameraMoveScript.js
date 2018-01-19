"use strict";

function CameraMoveScript() {
    CameraMoveScript.super(this);
    this.lastMouseX = NaN;
    this.lastMouseY = NaN;
    this.yawPitchRoll = new Laya.Vector3();
    this.tempRotationZ = new Laya.Quaternion();
    this.isMouseDown = false;
    this.rotaionSpeed = 0.0006;
    this.origin = new Laya.Vector3(0, 0, 0);

    this.mainCameraAnimation = null;
    this.scene = null;
}
Laya.class(CameraMoveScript, "CameraMoveScript", Laya.Script);

CameraMoveScript.prototype._initialize = function (owner) {
    var _this = this;
    var _parent = owner.parent.parent; // Parent of the scene
    CameraMoveScript.__super.prototype._initialize.call(this,owner);
    _parent.on("mousedown", this, this.mouseDown);
    _parent.on("mouseup", this, this.mouseUp);
    _parent.on("mouseout", this, this.mouseOut);
    _this.camera = owner;
}

CameraMoveScript.prototype._update = function (state) {
    CameraMoveScript.__super.prototype._update.call(this,state);
    this.updateCamera(state.elapsedTime);
}

CameraMoveScript.prototype.updateCamera = function (elapsedTime) {
    if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY)) {
        var scene = this.owner.scene;
        Laya.KeyBoardManager.hasKeyDown(87) && this.camera.moveForward(-0.002 * elapsedTime);
        Laya.KeyBoardManager.hasKeyDown(83) && this.camera.moveForward(0.002 * elapsedTime);
        Laya.KeyBoardManager.hasKeyDown(65) && this.camera.moveRight(-0.002 * elapsedTime);
        Laya.KeyBoardManager.hasKeyDown(68) && this.camera.moveRight(0.002 * elapsedTime);
        Laya.KeyBoardManager.hasKeyDown(81) && this.camera.moveVertical(0.002 * elapsedTime);
        Laya.KeyBoardManager.hasKeyDown(69) && this.camera.moveVertical(-0.002 * elapsedTime);
        if (this.isMouseDown) {
            var offsetX = Laya.stage.mouseX - this.lastMouseX;
            var offsetY = Laya.stage.mouseY - this.lastMouseY;
            var yprElem = this.yawPitchRoll.elements;
            yprElem[0] -= offsetX * this.rotaionSpeed * elapsedTime;
            yprElem[1] -= offsetY * this.rotaionSpeed * elapsedTime;
            this.updateRotation();
        }
    }
    this.lastMouseX = Laya.stage.mouseX;
    this.lastMouseY = Laya.stage.mouseY;
}

CameraMoveScript.prototype.updateRotation = function () {
    var yprElem = this.yawPitchRoll.elements;
    if (Math.abs(yprElem[1]) < 1.50) {
        Laya.Quaternion.createFromYawPitchRoll(yprElem[0], yprElem[1], yprElem[2], this.tempRotationZ);
        this.camera.transform.localRotation = this.tempRotationZ;

        // Above is the script from Laya to update the rotation of the camera.
        // We continue to update the position so that the camera orbit the car.
        var distance = Laya.Vector3.distance(this.origin, this.camera.transform.position);
        var forward = this.camera.transform.forward;
        forward.x *= -distance;
        forward.y *= -distance;
        forward.z *= -distance;
        this.camera.transform.position = forward;
    }
}

CameraMoveScript.prototype.mouseDown = function (e) {
    this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
    this.lastMouseX = Laya.stage.mouseX;
    this.lastMouseY = Laya.stage.mouseY;
    this.isMouseDown = true;
}

CameraMoveScript.prototype.mouseUp = function (e) {
    this.isMouseDown = false;
}

CameraMoveScript.prototype.mouseOut = function (e) {
    this.isMouseDown = false;
}
