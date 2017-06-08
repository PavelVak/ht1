import {Component, OnInit} from "@angular/core";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user";

@Component({
    styles: [`
        .user-card{cursor: pointer};
    `],
    templateUrl: './app/users/user-list/user-list.component.html'
})

export class UserListComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService){}

    ngOnInit(){
        this.userService.getUsers()
            .subscribe(users => this.users = users);
    }
}