import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { TrackbusPage } from '../trackbus/trackbus';
import { PaymentPage } from '../payment/payment';
import { LoginPage } from '../login/login';


// import { BusPage } from '../bus/bus';

/**
 * Generated class for the BusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html',
})
export class BusPage {

  selectedtrip:any;
  selectedfromloc:any;
  selectedtoloc:any;
  selectedseats:Array<any> = new Array();
  checkvaldetail:any;
  from:any;
  to:any;

  public SelectSeat: Array<any> = [
    {sindex:1, seat: '1',modelcheck: false, disabledcheck: false},
    {sindex:2, seat: '2',modelcheck: false, disabledcheck: false},
    {sindex:3, seat: '',modelcheck: false, disabledcheck: false},
    {sindex:4, seat: '3' ,modelcheck: false, disabledcheck: false},
    {sindex:5, seat: '4',modelcheck: false, disabledcheck: false},
    {sindex:6, seat: '5',modelcheck: false, disabledcheck: false},
    {sindex:7, seat: '6',modelcheck: false, disabledcheck: false },
    {sindex:8, seat: '',modelcheck: false , disabledcheck: false},
    {sindex:9, seat: '7',modelcheck: false, disabledcheck: false},
    {sindex:10, seat: '8' ,modelcheck: false, disabledcheck: false},
    {sindex:11, seat: '9',modelcheck: false, disabledcheck: false},
    {sindex:12, seat: '10',modelcheck: false, disabledcheck: false},
    {sindex:13, seat: '' ,modelcheck: false, disabledcheck: false},
    {sindex:14, seat: '11',modelcheck: false, disabledcheck: false},
    {sindex:15, seat: '12',modelcheck: false, disabledcheck: false},
    {sindex:16, seat: '',modelcheck: false, disabledcheck: false},
    {sindex:17, seat: '',modelcheck: false, disabledcheck: false},
    {sindex:18, seat: '',modelcheck: false, disabledcheck: false},
    {sindex:19, seat: '13',modelcheck: false , disabledcheck: false},
    {sindex:20, seat: '14',modelcheck: false, disabledcheck: false},

    {sindex:21, seat: '15',modelcheck: false, disabledcheck: false},
    {sindex:22, seat: '16',modelcheck: false, disabledcheck: false},
    {sindex:23, seat: '',modelcheck: false, disabledcheck: false},
    {sindex:24, seat: '17' ,modelcheck: false, disabledcheck: false},
    {sindex:25, seat: '18',modelcheck: false, disabledcheck: false},
    {sindex:26, seat: '19',modelcheck: false, disabledcheck: false},
    {sindex:27, seat: '20',modelcheck: false, disabledcheck: false },
    {sindex:28, seat: '',modelcheck: false , disabledcheck: false},
    {sindex:29, seat: '21',modelcheck: false, disabledcheck: false},
    {sindex:30, seat: '22' ,modelcheck: false, disabledcheck: false},
    {sindex:31, seat: '23',modelcheck: false, disabledcheck: false},
    {sindex:32, seat: '24',modelcheck: false, disabledcheck: false},
    {sindex:33, seat: '' ,modelcheck: false, disabledcheck: false},
    {sindex:34, seat: '25',modelcheck: false, disabledcheck: false},
    {sindex:35, seat: '26',modelcheck: false, disabledcheck: false},
    {sindex:36, seat: '27',modelcheck: false, disabledcheck: false},
    {sindex:37, seat: '28',modelcheck: false, disabledcheck: false},
    {sindex:38, seat: '29',modelcheck: false, disabledcheck: false},
    {sindex:39, seat: '30',modelcheck: false , disabledcheck: false},
    {sindex:40, seat: '31',modelcheck: false, disabledcheck: false}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alerCtrl: AlertController, public toastCtrl: ToastController) {

    this.selectedtrip = navParams.data.value;
    var splitdata= this.selectedtrip.split("_");
    this.selectedfromloc=splitdata[2];
    this.selectedtoloc=splitdata[3];

      this.restProvider.getbusticketdetails(this.selectedtrip).then(data=> {
          this.disableSeatsIfbooked(data);
      });
      this.checkvaldetail=false;
      this.from = localStorage.getItem('from');
      this.to = localStorage.getItem('to');
  }

  disableSeatsIfbooked(data)
  {
      this.resetseats();

      for(var i=0;i<data.length;i++)
      {         
          for(var j=0;j<this.SelectSeat.length;j++)
          {              
              if(parseInt(this.SelectSeat[j].seat)==parseInt(data[i].seat_num) )
              {
                  this.SelectSeat[j].disabledcheck=true;

                  if((parseInt(data[i].from_loc)<parseInt(data[i].to_loc)) && parseInt(data[i].to_loc)<=this.selectedfromloc)
                  {
                      this.SelectSeat[j].disabledcheck=false;
                  }

                  if((parseInt(data[i].from_loc)>parseInt(data[i].to_loc)) && parseInt(data[i].to_loc)>=this.selectedfromloc)
                  {
                      this.SelectSeat[j].disabledcheck=false;
                  }
              }             
          }
      }
  }
  resetseats()
  {
      for(var j=0;j<this.SelectSeat.length;j++)
      {   
          this.SelectSeat[j].disabledcheck=false;
      }
  }

  bookticket(ticket,checkvaldetail,sindex)
  {

      var newticket=this.selectedtrip+"_"+ticket;

      if(this.SelectSeat[sindex-1].modelcheck==false)
      {
          this.selectedseats.push(newticket);
      }
      else
      {
          var index=this.selectedseats.indexOf(newticket);
          this.selectedseats.splice(index,1);
      }
  }
  checkselecteddt(ticket)
  {
      return false;
  }

  continue(){
    var seatval = this.selectedseats ;
      this.navCtrl.push(PaymentPage,{
        svalue: seatval
      })
  }
//   confirmtickets(seat)
//   {
//       var confirmed_seats=this.selectedseats.join(",");
//       this.restProvider.confirmseats(confirmed_seats).then(data=> 
//       {
        
//       });
//     //   let toast = this.toastCtrl.create({
//     //     message: 'Your Seats have been booked successfully',
//     //     duration: 3000,
//     //   });
//     //   toast.present();
//     let alert = this.alerCtrl.create({
//         message: 'Proceed to Payment',
//         buttons: [{
//           text: "OK",
//           handler: () => {
//             this.navCtrl.setRoot(HomePage);
//           },
//         },
//           {
//             text: "Cancel",
//             handler: () => {
//               console.log('No clicked');
//             }
//           },
//         ],
//           });
//           alert.present() 
// } 

  trackbus(){
    this.navCtrl.push(TrackbusPage);
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
