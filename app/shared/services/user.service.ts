import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService{
    private usersUrl: string = 'https://reqres.in/api/users';

    //observable source
    private userCreatedSource = new Subject<User>();
    private userDeletedSource = new Subject();
    //observable stream
    userCreated$ = this.userCreatedSource.asObservable();
    userDeleted$ = this.userDeletedSource.asObservable();

    constructor ( private http: Http ) {}

    /*Get all users*/
    getUsers(): Observable<User[]>{
        return this.http.get(this.usersUrl)
            .map(res => res.json().data)
            .map(users => users.map(this.toUser))
           .catch(this.handleError);
    }
    /*get single user*/
    getUser(id: number): Observable<User>{
        // attaching a token
        let headers = new Headers();
        let token = localStorage.getItem('auth_token');
        headers.append(`Content-type`, `application/json`);
        headers.append(`Authorization`, `Bearer ${token}`);

        return this.http.get(`${this.usersUrl}/${id}`, {headers})
            .map(res => res.json().data)
            .map(this.toUser)
            .catch(this.handleError);
    }
    /*Update the user*/
    updateUser(user: User): Observable<User>{
        //return this.http.get(`${this.usersUrl}/23`)
        return this.http.put(`${this.usersUrl}/${user.id}`,user)
            .map(res => res.json())
            .catch(this.handleError);
    }
    /*Create the user*/
    createUser(user: User): Observable<User>{
        return this.http.post(this.usersUrl, user)
            .map(res => res.json())
            .do(user => this.userCreated(user))
            .catch(this.handleError);
    }
    /*delete a user*/
    deleteUser(id: number): Observable<any>{
        return this.http.delete(`${this.usersUrl}/${id}`)
            .do(res => this.userDeleted())
            .catch(this.handleError);
    }
    /*the user was created. add this info to our stream*/
    userCreated(user: User){
        this.userCreatedSource.next(user);
    }
    /*the user was deleted. add this info to our stream*/
    userDeleted(){
        console.log('user has been deleted');
        this.userDeletedSource.next();
    }
    /*convert user info from the API to our standart/format*/
    private toUser(user): User {
        return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            username: user.first_name,
            avatar: user.avatar
        };
    }
    /*handle any errors from the APi*/
    private handleError(err){
        let errMessage: string;

        if(err instanceof Response){
            let body = err.json() || '';
            let error = body.error || JSON.stringify(body);
            errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
        } else {
            errMessage = err.message ? err.message : err.toString();
        }
        return Observable.throw(errMessage);
        //return Observable.throw(err.json().data || 'Server error');
    }





    //grab all users
    //get a single user
    //create a user
    //update a user
    //delete a user
}