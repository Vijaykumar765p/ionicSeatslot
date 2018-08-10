import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';


/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  seatbook:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alerCtrl: AlertController) {
    this.seatbook = navParams.data.svalue;
  }

  ionViewDidLoad() {
   
  }

  confirmtickets(seat)
  {
    let alert = this.alerCtrl.create({
        message: 'Proceed to Payment',
        buttons: [{
          text: "OK",
          handler: () => {
            var confirmed_seats=this.seatbook.join(",");
            this.restProvider.confirmseats(confirmed_seats).then(data=> 
            {
        
            });
            this.navCtrl.setRoot(HomePage);
          },
        },
          {
            text: "Cancel",
            handler: () => {
             
            }
          },
        ],
          });
          alert.present() 
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
