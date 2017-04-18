import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from '../home/authservice';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {


    constructor(public http: Http, public authservice: AuthService) {
        this.http = http;
    }


    getPage(page) {
        return new Promise(resolve => {
            var headers = new Headers();
            this.authservice.loadUserCredentials();
            headers.append('Authorization', 'Bearer: ' +this.authservice.AuthToken);
            this.http.get('http://localhost/bgp/api/'+page+'.json', {headers: headers}).map(res => res.json()).subscribe(data => {
                if(data.response == 'success'){
                    resolve(data);                    
                }else{
                    resolve(false);
                }
            });
        });
    }




    

}