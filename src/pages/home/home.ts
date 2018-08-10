import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
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

  

  constructor(public navCtrl: NavController, public restProvider: RestProvider,public alerCtrl: AlertController, public menu: MenuController) {
     this.gettrip();
     this.changelocation(this.tripbusid);
     this.menu.swipeEnable(true);
  }

  findBus()
  {
    var fromtoloc= this.selectedfromloc+"_"+this.selectedtoloc;
      document.getElementById('busDetail').style.display = "block";
        this.restProvider.getbus(fromtoloc).then(data=> {
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
    }
    );
  }

  // getFromToLocation(id,type)
  // {
  //   for(var i=0;i<this.locationfromlist.length;i++)
  //   {
  //     if(this.locationfromlist[i].loc_id==id)
  //     {
  //       if(type=='from')
  //       {
  //         localStorage.setItem('from', this.locationfromlist[i].location);
  //       }else{
  //         localStorage.setItem('to', this.locationtolist[i].location);
  //       }
  //     }
  //   }
  // }

  changefromlocation(locationfrom)
  {    
      var fromloc=locationfrom.split("_");
      this.selectedfromloc=fromloc[2];

  for(var i=0;i<this.locationfromlist.length;i++)
    {
      if(this.locationfromlist[i].loc_id==this.selectedfromloc)
      {
        localStorage.setItem('from', this.locationfromlist[i].location);
      }
    }


      // this.getFromToLocation(this.selectedfromloc,'from');
      this.restProvider.gettolocation(locationfrom).then(data=> {
        this.locationtolist=data;
      });
  }

  changetolocation(locationto)
  {
    var toloc=locationto.split("_");
    this.selectedtoloc =toloc[2];

    for(var i=0;i<this.locationtolist.length;i++)
    {
      if(this.locationtolist[i].loc_id==this.selectedtoloc)
      {
        localStorage.setItem('to', this.locationtolist[i].location);
      }
    }
    // this.getFromToLocation(this.selectedtoloc,'to');
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

  tapEvent(bus_id,trip_id) 
    {
      var navvalue = bus_id + "_"+trip_id+ "_" +this.selectedfromloc+"_"+this.selectedtoloc ;
      this.navCtrl.push(BusPage,{
        value: navvalue
      })
    }
}
