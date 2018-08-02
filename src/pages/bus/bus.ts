import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { TrackbusPage } from '../trackbus/trackbus';

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
  value: any;

  public SelectSeat: Array<any> = [
    {seat: '1',modelcheck: false, disabledcheck: false},
    {seat: '2',modelcheck: false, disabledcheck: false},
    {seat: '',modelcheck: false, disabledcheck: false, whitespace: true},
    {seat: '4' ,modelcheck: false, disabledcheck: false},
    {seat: '5',modelcheck: false, disabledcheck: false},
    {seat: '6',modelcheck: false, disabledcheck: false},
    {seat: '7',modelcheck: false, disabledcheck: false },
    {seat: '',modelcheck: false , disabledcheck: false, whitespace: true},
    {seat: '9',modelcheck: false, disabledcheck: false},
    {seat: '10' ,modelcheck: false, disabledcheck: false},
    {seat: '11',modelcheck: false, disabledcheck: false},
    {seat: '12',modelcheck: false, disabledcheck: false},
    {seat: '' ,modelcheck: false, disabledcheck: false, whitespace: true},
    {seat: '14',modelcheck: false, disabledcheck: false},
    {seat: '15',modelcheck: false, disabledcheck: false},
    {seat: '',modelcheck: false, disabledcheck: false, whitespace: true},
    {seat: '',modelcheck: false, disabledcheck: false, whitespace: true},
    {seat: '',modelcheck: false, disabledcheck: false, whitespace: true},
    {seat: '19',modelcheck: false , disabledcheck: false},
    {seat: '20',modelcheck: false, disabledcheck: false},


    
    {seat: '1',modelcheck: false, disabledcheck: false},
    {seat: '2',modelcheck: false, disabledcheck: false},
    {seat: '',modelcheck: false, disabledcheck: false},
    {seat: '4' ,modelcheck: false, disabledcheck: false},
    {seat: '5',modelcheck: false, disabledcheck: false},
    {seat: '6',modelcheck: false, disabledcheck: false},
    {seat: '7',modelcheck: false, disabledcheck: false },{seat: '',modelcheck: false , disabledcheck: false},{seat: '9',modelcheck: false, disabledcheck: false},{seat: '10' ,modelcheck: false, disabledcheck: false},{seat: '11',modelcheck: false, disabledcheck: false},{seat: '12',modelcheck: false, disabledcheck: false},{seat: '' ,modelcheck: false, disabledcheck: false},{seat: '14',modelcheck: false, disabledcheck: false},{seat: '15',modelcheck: false, disabledcheck: false},{seat: '16',modelcheck: false, disabledcheck: false},{seat: '17',modelcheck: false, disabledcheck: false},{seat: '18',modelcheck: false, disabledcheck: false},{seat: '19',modelcheck: false , disabledcheck: false},{seat: '20',modelcheck: false, disabledcheck: false}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alerCtrl: AlertController) {

    this.value = navParams.data.value;
    console.log(this.value);

      this.restProvider.getbusticketdetails(this.selectedtrip).then(data=> {
          console.log(data);
          this.disableSeatsIfbooked(data);
      });
      this.checkvaldetail=false;
      
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

                  if((parseInt(data[i].from_loc)<parseInt(data[i].to_loc)) && parseInt(data[i].to_loc)<=this.value)
                  {
                      this.SelectSeat[j].disabledcheck=false;
                  }

                  if((parseInt(data[i].from_loc)>parseInt(data[i].to_loc)) && parseInt(data[i].to_loc)>=this.value)
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

  bookticket(ticket,checkvaldetail)
  {
      var newticket=this.value+"_"+this.value+"_"+this.value+"_"+ticket;

      if(this.SelectSeat[ticket-1].modelcheck==false)
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

  confirmtickets()
  {
      var confirmed_seats=this.selectedseats.join(",");
      this.restProvider.confirmseats(confirmed_seats).then(data=> 
      {
          // alert('Seats have booked successfully');
          console.log(data); 
      });
      let alert = this.alerCtrl.create({
        title: 'Hi',
        message: 'Your Seats have booked successfully',
        buttons: [{
          text: "OK",
      }],
      });
      alert.present()
  }

  trackbus(){
    this.navCtrl.push(TrackbusPage);
  }
}
