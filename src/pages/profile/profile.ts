import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  users : any;
  
  constructor(public navCtrl: NavController, public restProvider: RestProvider, public navParams: NavParams, public alerCtrl: AlertController) {

  }

  ionViewDidLoad() {
    var uid = localStorage.getItem('uid');
    this.getuser(uid);
  }

  getuser(id) {
    this.restProvider.getUser(id) .then(data => {
      this.users = data;
      });
  }
  logout(){   
    let alert = this.alerCtrl.create({
        title: 'Hey',
        message: 'Do you want to Log out',
        buttons: [{
          text: "Yes",
          handler: () => {
            this.navCtrl.setRoot(LoginPage);
            localStorage.clear();
          },
      },
      {
        text: "No",
        handler: () => {
        }
      },
    ],
      });
      alert.present() 
  }
}
