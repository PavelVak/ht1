import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../../shared/models/user";
import { UserService} from "../../shared/services/user.service";

@Component({
    templateUrl: './app/users/user-create/user-create.component.html'
})

export class UserCreateComponent {
    user: User = {name: '', username: '', avatar: ''};
    successMessage: string = '';
    errorMessage: string = '';
    constructor(private userService: UserService, private router: Router){}

    /*Create a User*/
   createUser(){
       this.successMessage = '';
       this.errorMessage = '';
      this.userService.createUser(this.user)
          .subscribe(user => {
              this.successMessage = 'User was created!';

              /*navigate back to users-page*/
              this.router.navigate(['/users']);
              console.log('user was created');
          })
   }

}