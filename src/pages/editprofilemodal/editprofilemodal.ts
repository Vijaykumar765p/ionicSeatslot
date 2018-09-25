import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the EditprofilemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofilemodal',
  templateUrl: 'editprofilemodal.html',
})
export class EditprofilemodalPage {
  regData = { avatar:''};
  imgPreview = 'assets/img/blank-avatar.jpg';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alerCtrl: AlertController, public viewCtrl : ViewController, private imagePicker: ImagePicker,
    private base64: Base64, public restProvider: RestProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilemodalPage');
  }
  
  getPhoto() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          this.imgPreview = results[i];
          this.base64.encodeFile(results[i]).then((base64File: string) => {
            this.regData.avatar = base64File;
          }, (err) => {
            console.log(err);
          });
      }
    }, (err) => { });
  }

  editprofile(){

    var body = JSON.stringify(
      {
           avatar: this.regData.avatar
      });
      this.restProvider.doedit(body, function(res)
      {
        console.log(body);
      });
    this.viewCtrl.dismiss();
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
