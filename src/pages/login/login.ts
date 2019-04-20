import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user';
import { Status } from '../../interfaces/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  nick: string;
  email: string;
  password: string;
  status: Status;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.authProvider.loginWithEmail(this.email, this.password).then((data) => {
      console.log(`loginWithEmail: ${data}`);
      localStorage.setItem('loginData', JSON.stringify(data));
      this.navCtrl.push(HomePage);
    }).catch((error) => {
      console.log(`error on loginWithEmail: ${error}`);
    });
  }

  register() {
    this.authProvider.registerWithEmail(this.email, this.password).then((data) => {
      console.log(`registerWithEmail: ${data}`);
      const user = {
        uid: data.user.uid,
        nick: this.nick,
        email: this.email,
        status: this.status
      };
      this.userProvider.createUser(user).then((data2) => {
        console.log(`createUser: ${data2}`);
      }).catch((error2) => {
        console.log(`error on createUser: ${error2}`);
      });
    }).catch((error) => {
      console.log(`error on registerWithEmail: ${error}`);
    });
  }

}
