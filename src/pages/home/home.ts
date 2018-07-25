import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  locationlist : any;
  locationtolist : any;
  tripList : any;
  trip1 : any;
  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
     this.gettrip();
  }
  findBus()
  {
    document.getElementById('busDetail').style.display = "block";
  }
  // getlocation()
  // {
  //   this.restProvider.getLocate().then(data=> {
  //     this.locationlist=data;
  //     console.log(data);
  //   }
  //   );
  // }
  gettrip()
  {
    this.restProvider.getTripbusDetails().then(data=> {
      console.log(data);
      this.tripList=data;
    }
    );
  }

  changelocation(trip){
    console.log(trip);
    this.restProvider.getfromlocation(trip).then(data=> {
      // console.log(data);
      this.locationlist=data;
      console.log(this.locationlist);
    }
    );
  }
  changefromlocation(locationfrom){
   
    this.restProvider.gettolocation(locationfrom).then(data=> {
      // console.log(data);
      this.locationtolist=data;
      console.log(this.locationtolist);
    }
    );
  }
}
