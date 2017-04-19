import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Userpage } from '../pages/userpage/userpage';
import { AuthService } from '../pages/home/authservice';
import { PostService } from '../pages/home/postservice';
import { Projects } from '../pages/projects/projects';
import { Customers } from '../pages/customers/customers';
import { Customerpage } from '../pages/customerpage/customerpage';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Userpage,
    Projects,
    Customers,
    Customerpage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Userpage,
    Projects,
    Customers,
    Customerpage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    PostService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
