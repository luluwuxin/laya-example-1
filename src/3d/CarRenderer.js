"use strict";

function CarRenderer(parent) {
    CarRenderer.super(this);

    // A new Laya 3d scene into the parent node.
    this.parent = parent;
    this.scene  = parent.addChild(new Laya.Scene());

    // Add a default camera.
    this.camera = this.scene.addChild(new Laya.Camera());
    this.camera.transform.position = new Laya.Vector3(0, 10, 10);
    this.camera.transform.rotate(new Laya.Vector3(-45, 0, 0), true, false);
    this.camera.addComponent(CameraMoveScript);

    // Render into parent node rectangle.
    var p0 = parent.localToGlobal(new Laya.Point(0, 0));
    var p1 = parent.localToGlobal(new Laya.Point(parent.width, parent.height));
    this.camera.viewport = new Laya.Viewport(p0.x, p0.y, p1.x-p0.x, p1.y-p0.y);
}
Laya.class(CarRenderer, "CarRenderer", Laya.EventDispatcher);

// Load the specified car sprite.
CarRenderer.prototype.loadCar = function (url) {
    this.carObj = this.scene.addChild(Laya.Sprite3D.load(url));
};

// Load the debugging axis.
CarRenderer.prototype.loadAxis = function () {
    // X-axis
    var x = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(2,0.03,0.03)));
    var material = new Laya.StandardMaterial();
    material.albedo = new Laya.Vector4(1, 0, 0, 1);
    material.disableLight();
    x.meshRender.material = material;
    x.transform.position = new Laya.Vector3(1, 0, 0);
    
    // Y-axis
    var y = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.03,0.03,2)));
    var material = new Laya.StandardMaterial();
    material.albedo = new Laya.Vector4(0, 1, 0, 1);
    material.disableLight();
    y.meshRender.material = material;
    y.transform.position = new Laya.Vector3(0, 1, 0);
    
    // Z-axis
    var z = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.03,2,0.03)));
    var material = new Laya.StandardMaterial();
    material.albedo = new Laya.Vector4(0, 0, 1, 1);
    material.disableLight();
    z.meshRender.material = material;
    z.transform.position = new Laya.Vector3(0, 0, 1);
};
