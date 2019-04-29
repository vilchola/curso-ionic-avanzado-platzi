import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { AuthProvider } from '../../providers/auth';
import { UserProvider } from '../../providers/user';
import { HomePage } from '../home/home';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private userProvider: UserProvider) {
    this.authProvider.getStatus().subscribe((data) => {
      this.userProvider.getUserById(data.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
      }, (error) => {
        console.log(`error on getUserById: ${error}`);
      });
    }, (error) => {
      console.log(`error on getStatus: ${error}`);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  saveData() {
    this.userProvider.editUser(this.user).then(() => {
      alert('Usuario editado');
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      console.log(`error on editUser: ${error}`);
    });
  }

}
