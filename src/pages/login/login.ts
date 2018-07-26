import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, MenuController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../../pages/home/home';
// import { SignupPage } from '../../pages/signup/signup';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = { username: '', password: ''}
  loginData;

    constructor(public navCtrl: NavController,public forgotCtrl: AlertController,public menu: MenuController, public navParams: NavParams, public restProvider: RestProvider, public alertCtrl: AlertController, public toastCtrl: ToastController)
    {
      this.loginData=navCtrl;
    }


    ionViewDidLoad() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user){
        this.user = user;
        this.navCtrl.setRoot(HomePage);
      } 
    }


    login(loginData)
    {
         var body = JSON.stringify({
              uname: this.user.username,
              pwd: this.user.password
         });

        var self=this;
      	this.restProvider.doLogin(body, function(res)
        {

          var resdata=JSON.parse(res._body);
              if(resdata.length>0)
              {
                  if(resdata[0].exist == 0)
                    {
                      let toast = self.toastCtrl.create({
                      message: 'Oops...! Please Enter Valid Credentials',
                      duration: 3000,
                    });
                    toast.present(toast);
                    self.user = { username: null, password: null}
                  }
                  else
                  {
                    loginData.setRoot(HomePage);
                    self.user = { username: resdata[0].uname, password: resdata[0].pwd}
                    localStorage.setItem('user', JSON.stringify(self.user));
                    localStorage.setItem('uid', resdata[0].ur_id);
                  }
              }
        });
        //Api connections
        // this.navCtrl.push(HomePage);
        
    }

    signup()
    {
      //Api connections
      // this.navCtrl.push(SignupPage);
    }

    forgotPass() {
      let forgot = this.forgotCtrl.create({
        title: 'Forgot Password?',
        message: "Enter your email address to send a reset link password.",
        inputs: [
          {
            name: 'email',
            placeholder: 'Email',
            type: 'email'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Send',
            handler: data => {
              console.log('Send clicked');
              let toast = this.toastCtrl.create({
                message: 'Email was sent successfully',
                duration: 3000,
                position: 'top',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
            }
          }
        ]
      });
      forgot.present();
    }
}
