import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the Lost page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-lost',
  templateUrl: 'lost.html',
})
export class Lost {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goHomePage(){
    this.navCtrl.setRoot(HomePage);   
  }

  ionViewDidLoad() {
  }

}
