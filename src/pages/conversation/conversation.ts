import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { UserProvider } from '../../providers/user';

/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {

  friendId: any;
  friends: User[];
  friend: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
    this.friendId = navParams.data.user.uid || undefined;
    console.log(`friendId: ${this.friendId}`);
    this.friends = this.userProvider.getFriends();
    this.friend = this.friends.find((record) => {
      return record.uid == this.friendId;
    });
    console.log(`friend: ${JSON.stringify(this.friend)}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
