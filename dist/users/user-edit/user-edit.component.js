"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../shared/services/user.service");
var router_1 = require("@angular/router");
var UserEditComponent = (function () {
    function UserEditComponent(route, userService) {
        this.route = route;
        this.userService = userService;
        this.successMessage = '';
        this.errorMessage = '';
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.params['id'];
        this.userService.getUser(id).subscribe(function (user) { return _this.user = user; });
    };
    //update the user
    UserEditComponent.prototype.updateUser = function () {
        var _this = this;
        this.successMessage = '';
        this.errorMessage = '';
        this.userService.updateUser(this.user)
            .subscribe(function (user) {
            _this.successMessage = 'User was updated.';
            console.log('user was updated');
        }, function (err) {
            _this.errorMessage = 'User could not be updated';
            console.error(err);
        });
    };
    return UserEditComponent;
}());
UserEditComponent = __decorate([
    core_1.Component({
        templateUrl: './app/users/user-edit/user-edit.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, user_service_1.UserService])
], UserEditComponent);
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user-edit.component.js.map