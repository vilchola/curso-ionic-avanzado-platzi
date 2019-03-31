import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { LoginPage } from '../login/login';
import { User } from '../../interfaces/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    let myUser: User = {
      nick: 'Henry Vilchez',
      subnick: '@vilchola',
      age: 32,
      email: 'roberto1286@gmail.com',
      friend: false,
      uid: 1
    };
    let users: User[] = [
      myUser
    ];
    console.log(myUser);
  }

  goToConversation() {
    this.navCtrl.push(ConversationPage);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

}
