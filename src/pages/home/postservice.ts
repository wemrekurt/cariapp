import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class PostService {
    constructor(public http: Http) {
        this.http = http;
    }

}