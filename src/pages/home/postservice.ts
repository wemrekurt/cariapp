import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from '../home/authservice';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

    public url: string = 'http://www.localhost/bgp/api/';

    constructor(public http: Http, public authservice: AuthService) {
        this.http = http;
    }


    getPage(page) {       
        return new Promise(resolve => {
            var headers = new Headers();
            this.authservice.loadUserCredentials();
            headers.append('Authorization', 'Bearer: ' +this.authservice.AuthToken);
            this.http.get(this.url+page+'.json', {headers: headers}).map(res => res.json()).subscribe(data => {
                if(data.response == 'success'){
                    resolve(data);                    
                }else{
                    resolve(false);
                }
            });
        });
    }

    postPage(page, params){
        var creds = JSON.stringify(params);
        console.log(creds);        
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.authservice.loadUserCredentials();
        headers.append('Authorization', 'Bearer: ' +this.authservice.AuthToken);
        
        return new Promise(resolve => {
            this.http.post(this.url+page+'.json', creds, {headers: headers}).map(res => res.json()).subscribe(data => {
                if(data.response == 'success'){
                    resolve(data);
                }
                else
                    resolve(false);
            });
        });
    }




    

}