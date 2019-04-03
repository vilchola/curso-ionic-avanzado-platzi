import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user';

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

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.data.user || {};
    console.log(`uid: ${this.user.uid}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
