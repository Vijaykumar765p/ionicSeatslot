import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppMinimize } from '@ionic-native/app-minimize';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { BusPage } from '../pages/bus/bus';
import { PaymentPage } from '../pages/payment/payment';
import { SignupPage } from '../pages/signup/signup';
import { TrackbusPage } from '../pages/trackbus/trackbus';
import { RestProvider } from '../providers/rest/rest';
import { ProfilePage } from '../pages/profile/profile';
import { TicketPage } from '../pages/ticket/ticket';
import { EditprofilemodalPage } from '../pages/editprofilemodal/editprofilemodal';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    TrackbusPage,
    BusPage,
    PaymentPage,
    ProfilePage,
    TicketPage,
    EditprofilemodalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist: false, 
      autoFocusAssist: false}),
    HttpModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    TrackbusPage,
    BusPage,
    PaymentPage,
    ProfilePage,
    TicketPage,
    EditprofilemodalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Geolocation,
    Device,
    AppMinimize,
    ImagePicker,
    Base64
  ]
})
export class AppModule {}
