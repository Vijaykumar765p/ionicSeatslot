import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { BusPage } from '../bus/bus';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  locationfromlist : any;
  locationtolist : any;
  tripList : any;
  BusList : any;
  selectedtrip:any;
  selectedfromloc:any;
  selectedtoloc:any;
  tripbusid: any;
  

  constructor(public navCtrl: NavController, public restProvider: RestProvider,public alerCtrl: AlertController) {
     this.gettrip();
     this.changelocation(this.tripbusid);
  }

  findBus()
  {
      document.getElementById('busDetail').style.display = "block";
        this.restProvider.getbus().then(data=> {
            this.BusList=data;
        });

  }
  
  gettrip()
  {
    this.restProvider.getTripbusDetails().then(data=> {
      // console.log(data);
      this.tripList=data;
    });
  }

  changelocation(trip)
  {

    if(trip)
    {
      var tipdt=trip.split("_");
      this.selectedtrip=tipdt[0]+"_"+tipdt[1];
    }

    this.restProvider.getfromlocation(trip).then(data=> {
      // console.log(data);
      this.locationfromlist=data;
      console.log(this.locationfromlist);
    }
    );
  }

  changefromlocation(locationfrom)
  {    
      var fromloc=locationfrom.split("_");
      this.selectedfromloc=fromloc[2];

      this.restProvider.gettolocation(locationfrom).then(data=> {
        this.locationtolist=data;
        console.log(this.locationtolist);
      });
  }

  changetolocation(locationto)
  {
    var toloc=locationto.split("_");
    this.selectedtoloc =toloc[2];
    console.log(toloc);
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
          console.log('No clicked');
        }
      },
    ],
      });
      alert.present() 
  }

  tapEvent(bus_id,trip_id) 
    {
      var navvalue = bus_id + "_"+trip_id+ "_" +this.selectedfromloc+"_"+this.selectedtoloc ;
      this.navCtrl.push(BusPage,{
        value: navvalue
      })
    }
}
