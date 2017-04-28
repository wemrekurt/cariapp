import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
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
  
  public renewAmount: any;
  public renewDate: String = new Date().toISOString();
  
  public payAmount: any;
  public payDate: String = new Date().toISOString();
  public payTitle: String;
  public payDesc: String;
  public gelirgider: any = 1;

  public mailUser: String = '';
  public mailPass: String = '';
  public mailPass2: String = '';
  public mailDomain: any;
  public mailKota: any = 50;

  


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public postservice: PostService, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {    
    this.projectId = navParams.get("projectId");
    if(window.localStorage.getItem('globalmedia')) {
      
      let loader = this.loadingCtrl.create({
        content: "Veriler Getiriliyor. Lütfen bekleyin."
      });
      loader.present();

      this.postservice.getPage('project/'+this.projectId).then(res => { 
        if(res){
          this.project = res['data'];
          this.package = res['data']['project']['hosting'];
          this.mailDomain = res['data']['project']['main_domain'];
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

  ionViewDidLoad() {
    
  }  

  updatePackage(){
    //TODO: Post request for package update
    console.log(this.package);
  }


  addRenewPayment(projectId) {
    let confirm = this.alertCtrl.create({
      title: 'Ödeme Ekle',
      message: 'Yıllık ödeme eklenecektir, onaylıyor musunuz?',
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
           this.makeRenewPayment(projectId);
          }
        }
      ]
    });
    confirm.present();
  }


  makeRenewPayment(projectId){
    let params = "_token=renew_amount&project_id="+projectId+"&amount="+this.renewAmount+"&date="+this.renewDate;
    var pay = this.postservice.postPage('projects', params);
    if(pay){   
      this.presentToast('Ödeme Eklendi','');
      this.renewDate = '';
      this.renewAmount='';    
    }else{
      this.showAlert('Ödeme Eklenemedi','Bir hata oluştu ve ödeme eklenemedi!');
    }
  }

  addPayment(projectId) {
    let confirm = this.alertCtrl.create({
      title: 'Ödeme Ekle',
      message: 'Cari Kaydı eklenecektir, onaylıyor musunuz?',
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
           this.makePayment(projectId);
          }
        }
      ]
    });
    confirm.present();
  }

  makePayment(projectId){
    let params = "_token=addrecord&projectid="+projectId+"&amount="+this.payAmount+"&date="+this.payDate+"&gelirorgider="+this.gelirgider+"&name="+this.payTitle+"&description="+this.payDesc;
    var pay = this.postservice.postPage('projects', params);
    if(pay){   
      this.presentToast('Ödeme Eklendi','');
      this.payTitle = '';
      this.payDesc = '';
      this.payDate = '';
      this.payAmount='';    
    }else{
      this.showAlert('Ödeme Eklenemedi','Bir hata oluştu ve ödeme eklenemedi!');
    }
  }

  addEmail(cpuser, cpass){
    let params = "_token=epostaolustur&cpuser="+cpuser+"&cpass="+cpass+"&eposta="+this.mailUser+"&password="+this.mailPass+"&password2="+this.mailPass2+"&alanadi="+this.mailDomain+"&kota="+this.mailKota;
    var create = this.postservice.postPage('projects', params);
    if(create){   
      this.presentToast('E-posta Oluşturuldu','E-posta Hesabı başarıyla oluşturuldu.');
      this.mailUser = '';
      this.mailPass = '';
      this.mailPass2 = '';
      this.mailKota = 50;
    }else{
      this.showAlert('E-posta Oluşturulamadı','Bir hata oluştu ve e-posta oluşturulamadı!');
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

  presentToast(description, date) {
    let toast = this.toastCtrl.create({
      message: description + ' ' + date,
      showCloseButton: true,
      position: 'middle',
      closeButtonText: 'OK'
    });
    toast.present();
  }


}







