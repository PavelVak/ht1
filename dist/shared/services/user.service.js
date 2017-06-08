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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.usersUrl = 'https://reqres.in/api/users';
        //observable source
        this.userCreatedSource = new Subject_1.Subject();
        this.userDeletedSource = new Subject_1.Subject();
        //observable stream
        this.userCreated$ = this.userCreatedSource.asObservable();
        this.userDeleted$ = this.userDeletedSource.asObservable();
    }
    /*Get all users*/
    UserService.prototype.getUsers = function () {
        var _this = this;
        return this.http.get(this.usersUrl)
            .map(function (res) { return res.json().data; })
            .map(function (users) { return users.map(_this.toUser); })
            .catch(this.handleError);
    };
    /*get single user*/
    UserService.prototype.getUser = function (id) {
        // attaching a token
        var headers = new http_1.Headers();
        var token = localStorage.getItem('auth_token');
        headers.append("Content-type", "application/json");
        headers.append("Authorization", "Bearer " + token);
        return this.http.get(this.usersUrl + "/" + id, { headers: headers })
            .map(function (res) { return res.json().data; })
            .map(this.toUser)
            .catch(this.handleError);
    };
    /*Update the user*/
    UserService.prototype.updateUser = function (user) {
        //return this.http.get(`${this.usersUrl}/23`)
        return this.http.put(this.usersUrl + "/" + user.id, user)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /*Create the user*/
    UserService.prototype.createUser = function (user) {
        var _this = this;
        return this.http.post(this.usersUrl, user)
            .map(function (res) { return res.json(); })
            .do(function (user) { return _this.userCreated(user); })
            .catch(this.handleError);
    };
    /*delete a user*/
    UserService.prototype.deleteUser = function (id) {
        var _this = this;
        return this.http.delete(this.usersUrl + "/" + id)
            .do(function (res) { return _this.userDeleted(); })
            .catch(this.handleError);
    };
    /*the user was created. add this info to our stream*/
    UserService.prototype.userCreated = function (user) {
        this.userCreatedSource.next(user);
    };
    /*the user was deleted. add this info to our stream*/
    UserService.prototype.userDeleted = function () {
        console.log('user has been deleted');
        this.userDeletedSource.next();
    };
    /*convert user info from the API to our standart/format*/
    UserService.prototype.toUser = function (user) {
        return {
            id: user.id,
            name: user.first_name + " " + user.last_name,
            username: user.first_name,
            avatar: user.avatar
        };
    };
    /*handle any errors from the APi*/
    UserService.prototype.handleError = function (err) {
        var errMessage;
        if (err instanceof http_1.Response) {
            var body = err.json() || '';
            var error = body.error || JSON.stringify(body);
            errMessage = err.status + " - " + (err.statusText || '') + " " + error;
        }
        else {
            errMessage = err.message ? err.message : err.toString();
        }
        return Observable_1.Observable.throw(errMessage);
        //return Observable.throw(err.json().data || 'Server error');
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map