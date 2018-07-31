import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

import { AppMinimize } from '@ionic-native/app-minimize';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor
    (
    public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public appMinimize: AppMinimize
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.platform.registerBackButtonAction(() => {
      this.appMinimize.minimize();
   });
  }
}

