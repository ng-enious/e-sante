System.register(['angular2/core', "angular2/src/core/metadata/view"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, view_1;
    var Forum;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            }],
        execute: function() {
            Forum = (function () {
                function Forum() {
                }
                Forum = __decorate([
                    core_1.Component({
                        selector: 'forum',
                        templateUrl: 'app/forum/forum.html',
                        styles: ['@import "https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700,900"; @import "https://fonts.googleapis.com/icon?family=Material+Icons";'],
                        styleUrls: ['app/forum/assets/css/bootstrap.css', 'app/forum/assets/css/bootstrap-material-design.css',
                            'app/forum/assets/css/style.css', 'app/forum/assets/css/colors.css'],
                        encapsulation: view_1.ViewEncapsulation.Emulated
                    }), 
                    __metadata('design:paramtypes', [])
                ], Forum);
                return Forum;
            }());
            exports_1("Forum", Forum);
        }
    }
});
//# sourceMappingURL=forum.component.js.map