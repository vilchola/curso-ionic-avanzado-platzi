import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { User, Status } from '../../interfaces/user';
import { UserProvider } from '../../providers/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: User[];
  query: string;
  status: Status;

  constructor(public navCtrl: NavController, private userProvider: UserProvider) {
    this.friends = this.userProvider.getFriends();
  }

  goToConversation(user: User) {
    this.navCtrl.push(ConversationPage, {user: user});
  }

  getIconByStatus(status) {
    let icon = '';
    switch (status) {
      case Status.Online:
        icon = 'logo_live_online.png';
        break;
      case Status.Offline:
        icon = 'logo_live_offline.png';
        break;
      case Status.Busy:
        icon = 'logo_live_busy.png';
        break;
      case Status.AppearOffline:
        icon = 'logo_live_appear_offline.png';
        break;
      case Status.Away:
        icon = 'logo_live_away.png';
        break;
    }
    return icon;
  }

  isOffline(status) {
    return status == Status.Offline || status == Status.AppearOffline;
  }

}
