"use strict";

function SensorMesh(radius, height, slices) {
    SensorMesh.super(this);

    this.radius = radius || 0.5;
    this.height = height || 2;
    this.slices = slices || 32;

    this.recreateResource();
    this._positions = this._getPositions();
    this._generateBoundingObject();
}
Laya.class(SensorMesh,'SensorMesh',Laya.PrimitiveMesh);

SensorMesh.prototype.recreateResource = function () {
    this._numberVertices  = this.slices+1 + 2;
    this._numberIndices   = this.slices * 2 * 3;
    var vertexDeclaration = Laya.VertexPositionNormalTexture.vertexDeclaration;
    var vertexFloatStride = vertexDeclaration.vertexStride / 4;

    var vertices = new Float32Array(this._numberVertices * vertexFloatStride);
    var indices  = new Uint16Array(this._numberIndices);

    var sliceAngle = (Math.PI * 2) / this.slices;
    var curAngle = 0;
    var verticeCount = 0;
    var vc = 0, ic = 0;

    for (var tv = 0; tv <= this.slices; tv++) {
        if (tv === 0) {
            // Origin
            vertices[vc++] = 0;
            vertices[vc++] = 0;
            vertices[vc++] = 0;
            vertices[vc++] = -1;
            vertices[vc++] = 0;
            vertices[vc++] = 0;
            vertices[vc++] = 0.5;
            vertices[vc++] = 0.5;
            // Center of the Cap
            vertices[vc++] = this.height;
            vertices[vc++] = 0;
            vertices[vc++] = 0;
            vertices[vc++] = 1;
            vertices[vc++] = 0;
            vertices[vc++] = 0;
            vertices[vc++] = 0.5;
            vertices[vc++] = 0.5;
        }
        curAngle = tv * sliceAngle;
        vertices[vc++] = this.height;
        vertices[vc++] = Math.cos(curAngle) * this.radius;
        vertices[vc++] = Math.sin(curAngle) * this.radius;
        vertices[vc++] = 1;
        vertices[vc++] = 0;
        vertices[vc++] = 0;
        vertices[vc++] = 0.5 + Math.cos(curAngle) * 0.5;
        vertices[vc++] = 0.5 + Math.sin(curAngle) * 0.5;
    }

    for (var ti = 0; ti < this.slices; ti++) {
        indices[ic++] = 0;
        indices[ic++] = ti+2;
        indices[ic++] = ti+3;
        indices[ic++] = 1;
        indices[ic++] = ti+2;
        indices[ic++] = ti+3;
    }
    verticeCount += this.slices+1 + 2;

    this._vertexBuffer = new Laya.VertexBuffer3D(
        vertexDeclaration,
        this._numberVertices,/*laya.webgl.WebGLContext.STATIC_DRAW*/0x88E4,
        true);
    this._indexBuffer = new Laya.IndexBuffer3D(
        /*laya.d3.graphics.IndexBuffer3D.INDEXTYPE_USHORT*/"ushort",
        this._numberIndices,
        /*laya.webgl.WebGLContext.STATIC_DRAW*/0x88E4,
        true);
    this._vertexBuffer.setData(vertices);
    this._indexBuffer.setData(indices);
    this.memorySize = (this._vertexBuffer._byteLength + this._indexBuffer._byteLength) * 2;
    this.completeCreate();
}
