import { Component, Input, OnInit } from '@angular/core';
import { UserProvider } from '../../providers/user';
import { User, Status } from '../../interfaces/user';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../../pages/conversation/conversation';

/**
 * Generated class for the FriendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'friend',
  templateUrl: 'friend.html'
})
export class FriendComponent implements OnInit {

  text: string;
  @Input() uid: string;
  friend: User;

  constructor(private navCtrl: NavController, private userProvider: UserProvider) {
    console.log('Hello FriendComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.userProvider.getUserById(this.uid).valueChanges().subscribe((data: User) => {
      this.friend = data;
      console.log(this.friend);
    }, (error) => {
      console.log(`error on getUserById: ${error}`);
    });
  }

  goToConversation(user: User) {
    this.navCtrl.push(ConversationPage, { user: user });
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
