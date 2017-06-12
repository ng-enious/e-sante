"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bounds_1 = require("./bounds");
var CropPosition = (function () {
    function CropPosition(x, y, w, h) {
        this.x = +x;
        this.y = +y;
        this.w = +w;
        this.h = +h;
    }
    CropPosition.prototype.toBounds = function () {
        return new bounds_1.Bounds(this.x, this.y, this.w, this.h);
    };
    CropPosition.prototype.isInitialized = function () {
        return this.x && this.y && this.w && this.h && this.w !== 0 && this.h !== 0;
    };
    return CropPosition;
}());
exports.CropPosition = CropPosition;
//# sourceMappingURL=cropPosition.js.map