import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PostService } from '../home/postservice';
import { HomePage } from '../home/home';

/**
 * Generated class for the Sms page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sms',
  templateUrl: 'sms.html',
})
export class Sms {
  public credit: any;
  public customers: any;
  public message: String = '';
  public which: String = 'selected';
  public receivers: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public postservice: PostService,
    public alertCtrl: AlertController
  ) {

    if(window.localStorage.getItem('globalmedia')) {
      let loader = this.loadingCtrl.create({
        content: "Veriler Getiriliyor. Lütfen bekleyin."
      });
      loader.present();
      this.postservice.getPage('sms').then(res => {
        if(res){
          console.log(res['data']);
           
          this.credit = res['data']['credit']; 
          this.customers = res['data']['customers'];
          
          loader.dismiss();
        }else{
          loader.dismiss();
          this.showAlert('HATA!','Veriler Getirilemedi');
          this.navCtrl.setRoot(HomePage);        
        }
      });
    }else{
      this.navCtrl.setRoot(HomePage);
    }

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
    this.navCtrl.setRoot(HomePage);
  }

  sendEveryone(){
    if(this.message){
      let params="_token=everyone&message="+this.message;

      let confirm = this.alertCtrl.create({
      title: 'SMS Gönder',
      message: 'Mesajınız tüm müşterilere ('+this.customers.length+' kişi) gönderilecektir',
      buttons: [
        {
          text: 'İptal',
          handler: () => {
            //ONAYLANMADI
          }
        },
        {
          text: 'Onaylıyorum',
          handler: () => {
            let send = this.postservice.postPage('sms', params);
            if(send){
              this.showAlert('Tebrikler','Mesajınız tüm müşterilere gönderilmiştir!');
              this.message = '';
            }else{
              this.showAlert('HATA','Mesaj gönderilemedi');
            }
          }
        }
      ]
    });
    confirm.present();

    }else{
      this.showAlert('HATA','Mesaj alanı boş bırakılamaz');
    }

  }

  sendSelected(){
    if(this.message && this.receivers){
      let receivers = this.receivers.join(',');
      let params="_token=selected&message="+this.message+"&ids="+receivers;

      let confirm = this.alertCtrl.create({
      title: 'SMS Gönder',
      message: 'Mesajınız seçtiğiniz '+this.receivers.length+' kişiye gönderilecektir',
      buttons: [
        {
          text: 'İptal',
          handler: () => {
            //ONAYLANMADI
          }
        },
        {
          text: 'Onaylıyorum',
          handler: () => {
            let send = this.postservice.postPage('sms', params);
            if(send){
              this.showAlert('Tebrikler','Mesajınız seçtiğiniz müşterilere gönderilmiştir!');
              this.message = '';
              this.receivers = [];
            }else{
              this.showAlert('HATA','Mesaj gönderilemedi');
            }
          }
        }
      ]
    });
    confirm.present();

    }else{
      this.showAlert('HATA','Mesaj alanı ve/veya seçilen kişiler boş bırakılamaz');
    }
  }

  ionViewDidLoad() {
  }

}
