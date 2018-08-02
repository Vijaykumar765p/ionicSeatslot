import { Injectable } from '@angular/core';
import {Http,RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// localhost
let apiUrl = 'http://localhost:2000/';
// Act Network
// let apiUrl = 'http://192.168.1.50:2000/'; 
// Intra network
// let apiUrl = 'http://192.168.1.20:2000/';
// Other networks
// let apiUrl = 'http://202.83.18.101:2000/';

@Injectable()
export class RestProvider {

  constructor(private http:Http, private HttpClient:HttpClient) {
    console.log('Hello RestProvider Provider');
  }

// Slot booking App
// Get() methods
getLocate() {
  return new Promise(resolve => {
    this.HttpClient.get(apiUrl+'places').subscribe(data => {
      resolve(data);
      console.log(data);
    }, err => {
      console.log(err);
    });
  });  
}

getTripbusDetails() {
  return new Promise(resolve => {
    this.HttpClient.get(apiUrl+'tripbusdetails').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });  
}

getfromlocation(trip) {
  return new Promise(resolve => {
    this.HttpClient.get(apiUrl+'getfromlocationdetails?bustrip_id='+trip).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });  
}

gettolocation(trip) {
  return new Promise(resolve => {
    this.HttpClient.get(apiUrl+'gettolocationdetails?bustrip_id='+trip).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });  
}

getbusticketdetails(bustrip_id)
{
    return new Promise(resolve => {
      this.HttpClient.get(apiUrl+'getbusticketdetails?bustrip_id='+bustrip_id).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    }); 
}

confirmseats(seats) {
  return new Promise(resolve => {
    this.HttpClient.get(apiUrl+'confirmseats?seats='+seats).subscribe(data => {
      resolve(data);
      console.log(data);
    }, err => {
      console.log(err);
    });
  });  
}

getbus()
{
    return new Promise(resolve => {
      this.HttpClient.get(apiUrl+'getbus').subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    }); 
}


/*----------------------------------------------------------------------------------------------------------*/
// Post() methods

// LOGIN API
 doLogin(formdata,cb) {
    let headers = new Headers({
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/plain, */*'
        });
        let options = new RequestOptions({ headers: headers });

      this.http
          .post(apiUrl+'bmtcslotlogin', formdata, options)
          .subscribe(data => 
          {
            cb(data);
                 
          }, error => {
                      console.log(JSON.stringify(error.json()));
          });
  }
}
