import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { PostService } from '../home/postservice';
import { Userpage } from '../userpage/userpage';
import { Projectpage } from '../projectpage/projectpage';
import { Customerpage } from '../customerpage/customerpage';
import { Chart } from 'chart.js';

/**
 * Generated class for the Statistics page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var window;
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class Statistics {

  public statistics: any;
  public smstext: String = '';
  @ViewChild('barCanvas') barCanvas;
  barChart: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public postservice: PostService, 
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController
  ) {
    if(window.localStorage.getItem('globalmedia')) {
      this.getStatistics();
    }else{
      this.navCtrl.setRoot(Userpage);
    }
  }

  getStatistics(){
    let loader = this.loadingCtrl.create({
      content: "Veriler Getiriliyor. Lütfen bekleyin."
    });
    loader.present();

    this.postservice.getPage('statistics').then(res => {
      if(res){
        this.statistics = res['data'];
        this.chartGenerate(res['data']['buay']);
        loader.dismiss();
      }else{
        loader.dismiss();
        this.showAlert('HATA!','Veriler Getirilemedi');
        this.navCtrl.setRoot(Userpage);
      }
    });
  }

  loadProject(id){
    this.navCtrl.push(Projectpage,{ projectId: id });
  }

  loadCustomer(id){
    this.navCtrl.push(Customerpage,{ userId: id });
  }

  callIt(number){
    window.location = "+90"+number;
  }

  chartGenerate(args){
    this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'doughnut',
        colors: ["#f56954", "#00a65a", "#3c8dbc"],
        data: {
          labels: [
              "Gelir",
              "Gider",
              "Proje"
          ],
          datasets: [
              {
                  data: [args['gelir'], args['gider'], args['price']],
                  backgroundColor: [
                      "#36A2EB",
                      "#FF6384",
                      "#FFCE56"
                  ],
                  hoverBackgroundColor: [
                      "#36A2EB",
                      "#FF6384",
                      "#FFCE56"
                  ]
              }]
        }
    });
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Tamam']
    });
    alert.present();
  }

  logout() {
    this.navCtrl.setRoot(Userpage);
  }

  ionViewDidLoad() {

  }

}
