import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { LoginPage } from '../login/login';
import { User } from '../../interfaces/user';
import { UserProvider } from '../../providers/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: User[];

  constructor(public navCtrl: NavController, private userProvider: UserProvider) {
    this.friends = this.userProvider.getFriends();
  }

  goToConversation(user: User) {
    this.navCtrl.push(ConversationPage, {user: user});
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

}
