import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../home/authservice';
import { PostService } from '../home/postservice';
import { HomePage } from '../home/home';


/**
 * Generated class for the Projects page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class Projects {

  constructor(public navCtrl: NavController) {

    if(window.localStorage.getItem('globalmedia')) {
            
    }else{
      this.navCtrl.setRoot(HomePage);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Projects');
  }

}
