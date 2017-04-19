import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostService } from '../home/postservice';
import { HomePage } from '../home/home';
import { Userpage } from '../userpage/userpage';
import { Customerpage } from '../customerpage/customerpage';


/**
 * Generated class for the Customers page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class Customers {

  public all_customers: any;
  public filtered_customers: any;
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public postservice: PostService) {
    if(window.localStorage.getItem('globalmedia')) {
      this.postservice.getPage('customers').then(res => { 
        this.all_customers = res['data']['musteriler']; 
        this.filtered_customers = res['data']['musteriler']; 
      });
    }else{
      this.navCtrl.setRoot(HomePage);
    }
  }

  initializeItems(){
    this.filtered_customers = this.all_customers;
  }

  getItems(ev: any) {
    
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filtered_customers = this.all_customers.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ionViewDidLoad() {
  }

  loadPage(id){
    this.navCtrl.push(Customerpage,{
            userId: id
          });
  }

}
