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
  friend: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
    /*this.friendId = navParams.data.user.uid || undefined;
    console.log(`friendId: ${this.friendId}`);
    
    this.userProvider.getUserById(this.friendId).valueChanges()
      .subscribe((data: User) => {
        this.friend = data;
      }, (error) => {
        console.log(`error on getUserById: ${error}`);
      });
    console.log(`friend: ${this.friend}`);*/

    this.friend = navParams.data.user || {};
    console.log(`friend: ${JSON.stringify(this.friend)}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

}
