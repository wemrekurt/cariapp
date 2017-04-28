import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
  public messageText: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public postservice: PostService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.userId = navParams.get("userId");
    if(window.localStorage.getItem('globalmedia')) {
      this.postservice.getPage('customer/'+this.userId).then(res => { 
        this.user = res['data']; 
      });
    }else{
      this.navCtrl.setRoot(HomePage);
    }    
  }

  sendSms(phone){
    let params = "_token=smsgonder&smsmesaj="+this.messageText+"&telefon="+phone;
    var send = this.postservice.postPage('customers', params);
    if(send){   
      this.presentToast('Mesaj Gönderildi');
      this.messageText = '';    
    }else{
      this.showAlert('SMS Gönderilemedi','Bir hata oluştu ve sms gönderilemedi!');
    }
  }

  confirmSms(phone) {
    let confirm = this.alertCtrl.create({
      title: 'Mesaj Gönderilecektir?',
      message: this.messageText,
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
            this.sendSms(phone);
          }
        }
      ]
    });
    confirm.present();
  }


  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  ionViewDidLoad() {
  }


}
