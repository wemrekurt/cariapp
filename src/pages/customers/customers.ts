import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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
  public new_customer: any = {name: '', company: '', cphone: '', phone: '', address: '', email: ''};
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public postservice: PostService, public alertCtrl: AlertController) {
    if(window.localStorage.getItem('globalmedia')) {
      this.getCustomers();
    }else{
      this.navCtrl.setRoot(HomePage);
    }
  }

  getCustomers(){
      this.postservice.getPage('customers').then(res => { 
        this.all_customers = res['data']['musteriler']; 
        this.filtered_customers = res['data']['musteriler']; 
      });
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

  newCustomer() {
    let prompt = this.alertCtrl.create({
      title: 'Yeni Müşteri',
      message: 'Müşteri Bilgilerini Eksiksiz Giriniz',
      inputs: [
        {
          name: 'name',
          placeholder: 'İsim',
          value: this.new_customer.name
        },
        {
          name: 'company',
          placeholder: 'Firma Adı',
          value: this.new_customer.company
        },
        {
          name: 'cphone',
          placeholder: 'Cep Telefonu',
          value: this.new_customer.cphone
        },
        {
          name: 'phone',
          placeholder: 'Sabit Telefon',
          value: this.new_customer.phone
        },
        {
          name: 'email',
          placeholder: 'E-posta',
          value: this.new_customer.email
        },
        {
          name: 'address',
          placeholder: 'Adres',
          value: this.new_customer.address
        },
      ],
      buttons: [
        {
          text: 'İptal',
          handler: data => {
            this.new_customer = data;
          }
        },
        {
          text: 'Kaydet',
          handler: data => {
            this.new_customer = data;
            if(data.name && data.cphone && data.email){
              let params = "_token=4c1bfbc8bf840ba3e617e96d03891ae2&name="+this.new_customer.name+"&company="+this.new_customer.company+"&cphone="+this.new_customer.cphone+"&phone="+this.new_customer.phone+"&address="+this.new_customer.address+"&email="+this.new_customer.email;
              var addCustomer = this.postservice.postPage('customers', params);
              if(addCustomer){   
                this.new_customer = {name: '', company: '', cphone: '', phone: '', address: '', email: ''};
                this.getCustomers();
                this.showAlert('Müşteri Eklendi','Müşteri kaydı oluşturulmuştur');
              }else{
                this.showAlert('Müşteri Eklenemedi','Bir hata oluştu ve müşteri eklenemedi!');
              }
            }else{
              this.showAlert('Müşteri Eklenemedi','Alanlar boş bırakılamaz!');
            }
            
          }
        }
      ]
    });
    prompt.present();
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }



}
