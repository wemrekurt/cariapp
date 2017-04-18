import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {AuthService} from './authservice';
import {Userpage} from '../userpage/userpage';
//import {Signup} from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    usercreds = {
        name: '',
        password: ''
    };

    constructor(public navCtrl: NavController, public authservice: AuthService) {
        this.authservice.checkLogin().then(data => {
            if(data){
                this.navCtrl.setRoot(Userpage);
            }else{
                //TODO: Burada kullanıcı adı ve parola otomatik girilmeli. (Bir önceki girişten tutulmalı)
                if(window.localStorage.getItem('globalmedia')){
                    console.log(window.localStorage.getItem('globalmedia'));
                }
            }
        });
     }

    login(user) {
        if(user.name && user.password){
            this.authservice.authenticate(user).then(data => {
                if(data) {
                    this.navCtrl.setRoot(Userpage);
                }else{
                    alert("Hatalı Bilgiler");
                }
            });
        }else{
            alert("Lütfen alanları doldurun");
        }
    }
    //signup() {
    //    this.navCtrl.push(Signup);
    //}

}