"use strict";

function ModalBlocker(parent) {
    ModalBlocker.super(this);

    // By default, insert an invisible button to the parent.
    this.m_uiModal = parent.addChild(new Laya.Button());
    this.m_uiModal.top     = 0;
    this.m_uiModal.bottom  = 0;
    this.m_uiModal.left    = 0;
    this.m_uiModal.right   = 0;
    this.m_uiModal.visible = false;
    this.modalCounter      = 0;
}
Laya.class(ModalBlocker, "ModalBlocker", Laya.EventDispatcher);

ModalBlocker.prototype.block = function () {
    if (++this.modalCounter > 0) {
        this.m_uiModal.visible = true;
    }
};

ModalBlocker.prototype.resume = function () {
    if (this.modalCounter === 0 || --this.modalCounter === 0) {
        this.m_uiModal.visible = false;
    }
};
