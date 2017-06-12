"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CropService = (function () {
    function CropService() {
    }
    CropService.prototype.init = function (canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    };
    ;
    return CropService;
}());
CropService.DEG2RAD = 0.0174532925;
exports.CropService = CropService;
//# sourceMappingURL=cropService.js.map