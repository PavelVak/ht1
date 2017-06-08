import { Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";



@Component({
    templateUrl: './app/login/login.component.html'
})
export class LoginComponent{
    credentials = {
        username: '',
        password: ''
    };
    successMessage: string = '';
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router){}

    /*Login a user*/
    login(){
       this.errorMessage = '';
       this.authService.login(this.credentials.username, this.credentials.password)
           .subscribe(
               data => {
                   this.router.navigate([''])
                   console.log(data);
               },
               err => {
                   this.errorMessage = err;
                   console.log(err)
               }
           )
    }
}