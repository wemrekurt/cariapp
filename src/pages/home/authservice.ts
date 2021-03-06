import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class AuthService {
    url: String= 'https://www.globalcari.com/api/';
    isLoggedin: boolean;
    AuthToken;

    constructor(public http: Http) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }

    storeUserCredentials(token) {
        window.localStorage.setItem('globalmedia', token);
        this.useCredentials(token);
    }

    storeUserInformation(id, name, email){
        window.localStorage.setItem('user_id',id);
        window.localStorage.setItem('user_name',name);
        window.localStorage.setItem('user_email',email);
    }

    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }

    loadUserCredentials() {
        var token = window.localStorage.getItem('globalmedia');
        this.useCredentials(token);
    }

    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.removeItem('globalmedia');
        window.localStorage.removeItem('user_id');
    }

    authenticate(user) {
        var creds = "username=" + user.name + "&password=" + user.password;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {
            this.http.post(this.url + 'login.json', creds, {headers: headers}).subscribe(data => {
                if(data.json().response == 'success'){
                    this.storeUserCredentials(data.json().token);
                    this.storeUserInformation(data.json().user_id, data.json().name, user.name);
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    }


    checkLogin() {
        return new Promise(resolve => {
            var headers = new Headers();
            this.loadUserCredentials();
            headers.append('Authorization', 'Bearer: ' +this.AuthToken);
            this.http.get(this.url+'checklogin.json', {headers: headers}).subscribe(data => {
                if(data.json().response == 'success'){
                    resolve(true);
                }else{
                    resolve(false);
                }
            });
        })
    }

    logout() {
        this.destroyUserCredentials();
    }
}
