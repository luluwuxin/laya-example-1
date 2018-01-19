"use strict";

function CarRenderer(parent) {
    CarRenderer.super(this);

    // A new Laya 3d scene into the parent node.
    this.parent = parent;
    this.scene  = parent.addChild(new Laya.Scene());

    // Add a default camera.
    this.camera = this.scene.addChild(new Laya.Camera());
    this.camera.transform.position = new Laya.Vector3(0, 6, 6);
    this.camera.transform.rotate(new Laya.Vector3(-45, 0, 0), true, false);
    this.camera.addComponent(CameraMoveScript);

    // Render into parent node rectangle.
    var p0 = parent.localToGlobal(new Laya.Point(0, 0));
    var p1 = parent.localToGlobal(new Laya.Point(parent.width, parent.height));
    this.camera.viewport = new Laya.Viewport(p0.x, p0.y, p1.x-p0.x, p1.y-p0.y);

    // A list of sensors
    this.sensors = [];
}
Laya.class(CarRenderer, "CarRenderer", Laya.EventDispatcher);

// Load the specified car sprite.
CarRenderer.prototype.loadCar = function (url) {
    this.carObj = this.scene.addChild(Laya.Sprite3D.load(url));
};

// Load the debugging axis.
CarRenderer.prototype.loadAxis = function () {
    // X-axis
    var x = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(2,0.1,0.1)));
    var material = new Laya.StandardMaterial();
    material.albedo = new Laya.Vector4(1, 0, 0, 1);
    material.disableLight();
    x.meshRender.material = material;
    x.transform.position = new Laya.Vector3(1, 0, 0);
    
    // Y-axis
    var y = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.1,0.1,2)));
    var material = new Laya.StandardMaterial();
    material.albedo = new Laya.Vector4(0, 1, 0, 1);
    material.disableLight();
    y.meshRender.material = material;
    y.transform.position = new Laya.Vector3(0, 1, 0);
    
    // Z-axis
    var z = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.1,2,0.1)));
    var material = new Laya.StandardMaterial();
    material.albedo = new Laya.Vector4(0, 0, 1, 1);
    material.disableLight();
    z.meshRender.material = material;
    z.transform.position = new Laya.Vector3(0, 0, 1);
};

// Update the current models to match the car config.
CarRenderer.prototype.refreshCarConfig = function (car_config) {
    // Add new 3D sensor representations.
    for (var i = this.sensors.length; i < car_config.config.length; i++) {
        var mesh = this.scene.addChild(new Laya.MeshSprite3D(new SensorMesh(0.5, 1)));
        var material = new Laya.StandardMaterial();

        material.albedo = new Laya.Vector4(1, 0, 0, 0.1);
        material.renderMode = Laya.StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;
        material.disableLight();
        mesh.meshRender.material = material;

        this.sensors.push({
            sensorMesh: mesh,
        });
    }

    // Remove sensors, which are already deleted.
    for (var i = car_config.config.length; i < this.sensors.length; i++) {
        this.sensors[i].sensorMesh.destroy();
    }
    this.sensors.length = car_config.config.length;

    // Update the transformations
    this.sensors.forEach(function (v, i) {
        var s = car_config.config[i];
        var x = v.sensorMesh.transform;

        // Laya is Y-up, right-handed, in meter.
        var pos = new Laya.Vector3(
            s.x / 100,
            s.z / 100, 
            s.y / 100
        );
        var rot = new Laya.Vector3(
            s.roll,
            -s.yaw,
            s.pitch
        );
        var scl = new Laya.Vector3(5, 3, 3);

        x.localRotationEuler = rot.clone();
        x.localScale = scl.clone();
        x.position = pos.clone();
    });
};
