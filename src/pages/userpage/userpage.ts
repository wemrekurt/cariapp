import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import {AuthService} from '../home/authservice';
import {PostService} from '../home/postservice';

import {HomePage} from '../home/home';
import { Chart } from 'chart.js';


/*
  Generated class for the Userpage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-userpage',
  templateUrl: 'userpage.html'
})
export class Userpage {

  public header_datas: any;
  public dashboard: any;
  @ViewChild('barCanvas') barCanvas;
  barChart: any;

  constructor(public navCtrl: NavController, public authservice: AuthService, public postservice: PostService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    
    if(window.localStorage.getItem('globalmedia')) {
      this.postservice.getPage('header_datas').then(res => { this.header_datas = res['data']; });
      this.postservice.getPage('index').then(res => { 
        this.dashboard = res['data']; 
        this.chartGenerate(res['data']);
      });
      
    }else{
      this.navCtrl.setRoot(HomePage);
    }
      
  }
  
    logout() {
        this.authservice.logout();
        this.navCtrl.setRoot(HomePage);
    }
    

    ionViewDidLoad() {
      this.presentLoading();
      
      //this.chartGenerate();

    }

    presentLoading() {
      let loader = this.loadingCtrl.create({
        content: "Lütfen Bekleyin...",
        duration: 2000
      });
      loader.present();
    }

    chartGenerate(ch){

      console.log(ch.months);
      var months = {
        name: [],
        gider: [],
        gelir: []
      };
      for(var i in ch.months){
        months.name.push(ch.months[i].tr);
        months.gider.push(ch.months[i].gider);
        months.gelir.push(ch.months[i].gelir);
      }

      this.barChart = new Chart(this.barCanvas.nativeElement, { 
          type: 'line',
          data: {
            labels: months.name,
            datasets: [
              {
                label: "Gider",
                backgroundColor: "rgba(244, 67, 54, 0.7)",
                fillColor: "#dd4b39",
                strokeColor: "#006e3b",
                pointColor: "#dd4b39",
                pointStrokeColor: "#006e3b",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgb(220,220,220)",
                data: months.gider
              },
              {
                label: "Gelir",
                backgroundColor: "rgba(132, 220, 198,0.4)",
                fillColor: "#4CAF50",
                strokeColor: "#4CAF50",
                pointColor: "#00a65a",
                pointStrokeColor: "#4CAF50",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(60,141,188,1)",
                data: months.gelir
              }
            ]
          }
 
      });
            
    }

}