import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import {AuthService} from './authservice';
import {Userpage} from '../userpage/userpage';
//import {Signup} from '../signup/signup';


declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    usercreds = {
        nick: '',
        name: '',
        password: ''
    };

    constructor(public navCtrl: NavController, public authservice: AuthService, public alertCtrl: AlertController) {
        this.authservice.checkLogin().then(data => {
            if(data){
                this.navCtrl.setRoot(Userpage);
            }else{
                if(window.localStorage.getItem('user_email')){
                    this.usercreds.name = window.localStorage.getItem('user_email');
                    this.usercreds.nick = window.localStorage.getItem('user_name');
                }            
            }
        });
     }

    forget(){
        this.usercreds = {
            nick: '',
            name: '',
            password: ''
        };
        window.localStorage.removeItem('user_email');
        window.localStorage.removeItem('user_name');
    }

    login(user) {
        if(user.name && user.password){
            this.authservice.authenticate(user).then(data => {
                if(data) {
                    this.navCtrl.setRoot(Userpage);
                }else{
                    this.showAlert('Hata','Girdiğiniz bilgiler hatalıdır. Lütfen tekrar deneyiniz', 'Tamam');
                }
            });
        }else{
            this.showAlert('Hata','Boş alan bırakamazsınız!', 'Tamam');
        }
    }

    showAlert(aTitle, aDesc, aButton) {
        let alert = this.alertCtrl.create({
            title: aTitle,
            subTitle: aDesc,
            buttons: [aButton]
        });
        alert.present();
    }


    //signup() {
    //    this.navCtrl.push(Signup);
    //}

}