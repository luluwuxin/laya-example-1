"use strict";

function CarRenderer(parent) {
    CarRenderer.super(this);

    // Layer to separate objects from other objects in the scene.
    this.layer = 2;

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

    // A list of sensors 3D sprite meshes.
    this.sensors = [];
}
Laya.class(CarRenderer, "CarRenderer", Laya.EventDispatcher);

// Load the specified car sprite.
CarRenderer.prototype.loadCar = function (url) {
    this.carObj = this.scene.addChild(Laya.Sprite3D.load(url));
    this.carObj.layer = Laya.Layer.getLayerByNumber(this.layer);
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
        // Mesh
        var mesh = this.scene.addChild(new Laya.MeshSprite3D(new SensorMesh(0.5, 1)));
        mesh.layer = Laya.Layer.getLayerByNumber(this.layer);

        // Material
        var material = new Laya.StandardMaterial();
        material.albedo = new Laya.Vector4(1, 0, 0, 0.1);
        material.renderMode = Laya.StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;
        material.disableLight();
        mesh.meshRender.material = material;

        // Collider
        var collider = mesh.addComponent(Laya.MeshCollider);
        collider.mesh = mesh.meshFilter.sharedMesh;

        // The above code should be the same for different sensors.
        this.sensors.push(mesh);
    }

    // Remove sensors, which are already deleted.
    for (var i = car_config.config.length; i < this.sensors.length; i++) {
        this.sensors[i].destroy();
    }
    this.sensors.length = car_config.config.length;

    // Update the transformations
    this.sensors.forEach(function (v, i) {
        var s = car_config.config[i];
        var x = v.transform;

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

        // Update collider for this sensor
        v.pickingInfo = JSON.stringify({
            type: "sensor",
            sid: s.sid,
        });
    });
};

// Select the car or its sensor in the view. (x, y) in global space.
CarRenderer.prototype.select = function (x, y) {
    // Ray from the global space point on near plane towards far plane.
    var ray = new Laya.Ray(new Laya.Vector3(0, 0, 0),
                           new Laya.Vector3(0, 0, 0));
    var hitInfo = new Laya.RaycastHit();
    var point = new Laya.Vector2();
    point.elements[0] = x;
    point.elements[1] = y;
    this.camera.viewportPointToRay(point, ray);

    // Collide with car and sensor scene objects.
    Laya.Physics.rayCast(ray, hitInfo, undefined, this.layer);

    if (hitInfo.sprite3D && typeof hitInfo.sprite3D.pickingInfo === "string") {
        try {
            return JSON.parse(hitInfo.sprite3D.pickingInfo);
        } catch (err)
        {}
    }
    return undefined;
};
