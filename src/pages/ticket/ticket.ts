import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the TicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alerCtrl: AlertController) {
  }

  ionViewDidLoad() {
    
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
