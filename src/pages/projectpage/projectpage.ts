import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, ViewController, Platform } from 'ionic-angular';
import { PostService } from '../home/postservice';
import { HomePage } from '../home/home';

/**
 * Generated class for the Projectpage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-projectpage',
  templateUrl: 'projectpage.html',
})
export class Projectpage {

  public projectId: any;
  public project: any;
  public package: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public postservice: PostService, 
    public loadingCtrl: LoadingController
  ) {
    this.projectId = navParams.get("projectId");
    if(window.localStorage.getItem('globalmedia')) {
      this.postservice.getPage('project/'+this.projectId).then(res => { 
        if(res){
          this.project = res['data'];
          this.package = res['data']['project']['hosting'];
        }else{
          //Alert          
        }
      });
    }else{
      this.navCtrl.setRoot(HomePage);
    }    
  }

  ionViewDidLoad() {
    this.presentLoading();
  }


  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Veriler Getiriliyor. Lütfen bekleyin.",
      duration: 1000
    });
    loader.present();
  }

  updatePackage(){
    //TODO: Post request for package update
    console.log(this.package);
  }

}







