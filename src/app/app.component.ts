import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RestProvider } from '../providers/rest/rest';
import { HomePage } from '../pages/home/home';
import { AppMinimize } from '@ionic-native/app-minimize';
import { ProfilePage } from '../pages/profile/profile';
import { TicketPage } from '../pages/ticket/ticket';
export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  appMenuItems: Array<MenuItem>;
  users: any;
  id:any;
  loading:any;

  constructor
  ( public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public restProvider: RestProvider,
    public menu: MenuController,
    public appMinimize: AppMinimize,
    public loadingCtrl: LoadingController) 
  {
    this.initializeApp();
    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Profile', component: ProfilePage, icon: 'ios-contacts'},
      {title: 'My Tickets', component: TicketPage, icon: 'ios-bookmark-outline'}
    ];
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      this.splashScreen.hide();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.appMinimize.minimize();

      //*** Control Keyboard
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
