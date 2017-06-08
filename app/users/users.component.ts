import {Component, OnInit} from "@angular/core";
import {UserService} from "../shared/services/user.service";
@Component({
    selector: 'my-users',
    templateUrl: './app/users/users.component.html'
})

export class UsersComponent implements OnInit {
    successMessage: string = '';
    errorMessage: string = '';

    constructor(private userService: UserService){}

    ngOnInit(){
        //user has been created
        this.userService.userCreated$.subscribe(user => {
            this.successMessage = `${user.name} User has been created!`;
            this.clearMessages();
        });
        //user has been deleted
        this.userService.userDeleted$.subscribe(() => {
            this.errorMessage = `The user has been deleted!`;
            this.clearMessages();
        });
    }
    /*clear Messages after 3 seconds */
    clearMessages(){
        setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
        }, 3000);
    }
}