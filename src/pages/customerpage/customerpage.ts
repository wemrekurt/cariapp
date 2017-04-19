import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PostService } from '../home/postservice';
import { HomePage } from '../home/home';

/**
 * Generated class for the Customerpage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-customerpage',
  templateUrl: 'customerpage.html',
})
export class Customerpage {
  
  public userId: any;
  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postservice: PostService) {
    this.userId = navParams.get("userId");
    if(window.localStorage.getItem('globalmedia')) {
      this.postservice.getPage('customer/'+this.userId).then(res => { 
        this.user = res['data']; 
      });
    }else{
      this.navCtrl.setRoot(HomePage);
    }    
  }

  ionViewDidLoad() {
  }


}
