import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../../pages/login/login';
import { TrackbusPage } from '../../pages/trackbus/trackbus';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  locationlist : any;
  locationtolist : any;
  tripList : any;
  trip1 : any;
  selectedtrip:any;
  selectedfromloc:any;
  selectedtoloc:any;
  selectedseats:Array<any> = new Array();
  checkvaldetail:any;

  public SelectSeat: Array<any> = [
    {seat: '01',modelcheck: false, disabledcheck: false},{seat: '02',modelcheck: false, disabledcheck: false},{seat: '03',modelcheck: false, disabledcheck: false},{seat: '04' ,modelcheck: false, disabledcheck: false},{seat: '05',modelcheck: false, disabledcheck: false},{seat: '06',modelcheck: false, disabledcheck: false},{seat: '07',modelcheck: false, disabledcheck: false },{seat: '08',modelcheck: false , disabledcheck: false},{seat: '09',modelcheck: false, disabledcheck: false},{seat: '10' ,modelcheck: false, disabledcheck: false},{seat: '11',modelcheck: false, disabledcheck: false},{seat: '12',modelcheck: false, disabledcheck: false},{seat: '13' ,modelcheck: false, disabledcheck: false},{seat: '14',modelcheck: false, disabledcheck: false},{seat: '15',modelcheck: false, disabledcheck: false},{seat: '16',modelcheck: false, disabledcheck: false},{seat: '17',modelcheck: false, disabledcheck: false},{seat: '18',modelcheck: false, disabledcheck: false},{seat: '19',modelcheck: false , disabledcheck: false},{seat: '20',modelcheck: false, disabledcheck: false}
  ]
  constructor(public navCtrl: NavController, public restProvider: RestProvider,public alerCtrl: AlertController) {
     this.gettrip();
     this.checkvaldetail=false;
  }

  findBus()
  {
      document.getElementById('busDetail').style.display = "block";
      this.restProvider.getbusticketdetails(this.selectedtrip).then(data=> {
          console.log(data);
          this.disableSeatsIfbooked(data);
      });

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
  // getlocation()
  // {
  //   this.restProvider.getLocate().then(data=> {
  //     this.locationlist=data;
  //     console.log(data);
  //   });
  // }
  gettrip()
  {
    this.restProvider.getTripbusDetails().then(data=> {
      console.log(data);
      this.tripList=data;
    });
  }

  changelocation(trip)
  {
    var tipdt=trip.split("_");
    this.selectedtrip=tipdt[0]+"_"+tipdt[1];
    

    this.restProvider.getfromlocation(trip).then(data=> {
      // console.log(data);
      this.locationlist=data;
      console.log(this.locationlist);
    }
    );
  }

  changefromlocation(locationfrom)
  {    
      var fromloc=locationfrom.split("_");
      this.selectedfromloc=fromloc[2];

      this.restProvider.gettolocation(locationfrom).then(data=> {
        // console.log(data);
        this.locationtolist=data;
        console.log(this.locationtolist);
      });
  }

  changetolocation(locationto)
  {
    var toloc=locationto.split("_");
    this.selectedtoloc =toloc[2];
  }

  bookticket(ticket,checkvaldetail)
  {
      var newticket=this.selectedtrip+"_"+this.selectedfromloc+"_"+this.selectedtoloc+"_"+ticket;

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
  logout(){  
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }
}
