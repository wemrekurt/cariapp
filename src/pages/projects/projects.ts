import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { PostService } from '../home/postservice';
import { Userpage } from '../userpage/userpage';
import { Projectpage } from '../projectpage/projectpage';


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

  public all_projects: any;
  public filtered_projects: any;
  searchQuery: string = '';

  constructor(
    public navCtrl: NavController, 
    public postservice: PostService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    if(window.localStorage.getItem('globalmedia')) {
      let loader = this.loadingCtrl.create({
        content: "Veriler Getiriliyor. Lütfen bekleyin."
      });
      loader.present();
      this.postservice.getPage('projects').then(res => {
        if(res){ 
          this.all_projects = res['data']['projects']; 
          this.filtered_projects = res['data']['projects']; 
          loader.dismiss();
        }else{
          loader.dismiss();
          this.showAlert('HATA!','Veriler Getirilemedi');
          this.navCtrl.setRoot(Userpage);        
        }
      });
    }else{
      this.navCtrl.setRoot(Userpage);
    }

  }

  initializeItems(){
    this.filtered_projects = this.all_projects;
  }

  getItems(ev: any) {
    // refill projects
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filtered_projects = this.all_projects.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  
  loadPage(id){
    this.navCtrl.push(Projectpage,{ projectId: id });
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  gohome() {
    this.navCtrl.setRoot(Userpage);
  }
  

  ionViewDidLoad() {
  }

}
