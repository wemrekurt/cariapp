import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostService } from '../home/postservice';
import { HomePage } from '../home/home';
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

  constructor(public navCtrl: NavController, public postservice: PostService) {

    if(window.localStorage.getItem('globalmedia')) {
      this.postservice.getPage('projects').then(res => { 
        this.all_projects = res['data']['projects']; 
        this.filtered_projects = res['data']['projects']; 
      });
    }else{
      this.navCtrl.setRoot(HomePage);
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
  

  ionViewDidLoad() {
  }

}
