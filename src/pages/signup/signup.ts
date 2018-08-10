import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../../pages/login/login';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	user = { email: '',mobile: '', pwd: '',fname: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,public alerCtrl: AlertController) {
  }

  signUp()
   {
     var body = JSON.stringify(
         {
              fname: this.user.fname,
              email: this.user.email,
              mobile: this.user.mobile,
              pwd: this.user.pwd
         });
        this.restProvider.doSignUp(body, function(res)
        {
        });
        let alert = this.alerCtrl.create({
          title: 'Hey,',
          message: 'You have Registered Successfully',
          buttons: ['Please Log in']
        });
        alert.present()
        this.navCtrl.setRoot(LoginPage);
      }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SignupPage');
  // }
  login() {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }
}
