import {Component, OnInit} from "@angular/core";
import { UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user";
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './app/users/user-edit/user-edit.component.html'
})

export class UserEditComponent implements OnInit {
    user: User;
    successMessage: string = '';
    errorMessage: string = '';
    constructor(private route: ActivatedRoute, private userService: UserService){}

    ngOnInit(){
        let id = this.route.snapshot.params['id'];
        this.userService.getUser(id).subscribe(user => this.user = user);
    }
    //update the user
    updateUser(){
        this.successMessage = '';
        this.errorMessage = '';
        this.userService.updateUser(this.user)
            .subscribe(
                user => {
                    this.successMessage = 'User was updated.';
                    console.log('user was updated');
                },
                err => {
                    this.errorMessage = 'User could not be updated';
                    console.error(err)
                }
            )
    }
}