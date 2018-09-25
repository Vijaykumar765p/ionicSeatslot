import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController  } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { EditprofilemodalPage } from '../editprofilemodal/editprofilemodal';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  users : any;
  
  constructor(public navCtrl: NavController, public restProvider: RestProvider, public navParams: NavParams, public alerCtrl: AlertController, public modalCtrl : ModalController) {

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
  openModal() {
    let modal = this.modalCtrl.create(EditprofilemodalPage);
    modal.present();
  }
}
