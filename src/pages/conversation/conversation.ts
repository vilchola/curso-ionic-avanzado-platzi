import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { AuthProvider } from '../../providers/auth';
import { UserProvider } from '../../providers/user';
import { ConversationProvider } from '../../providers/conversation';
import { Vibration } from '@ionic-native/vibration';

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
  friend: User;
  conversationId: any;
  message: string;
  conversation: any;
  shake: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public userProvider: UserProvider, public conversationProvier: ConversationProvider, public vibration: Vibration) {
    this.friend = this.navParams.data.user;
    this.authProvider.getStatus().subscribe((data) => {
      this.userProvider.getUserById(data.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        let idsArray = [this.user.uid, this.friend.uid].sort();
        this.conversationId = idsArray.join('||');
        this.getConversation();
      }, (error) => {
        console.log(`error on getUserById: ${error}`);
      });
    }, (error) => {
      console.log(`error on getStatus: ${error}`);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  sendMessage() {
    const messageObject: any = {
      uid: this.conversationId,
      timestamp: Date.now(),
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text',
      content: this.message
    };
    this.conversationProvier.add(messageObject).then((data) => {
      this.message = '';
    }).catch((error) => {
      console.log(`error on add: ${error}`);
    });
  }

  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    this.vibration.vibrate([200, 80, 150]);
    window.setTimeout(() => {
      this.shake = false;
    }, 800);
  }

  sendZumbido() {
    const messageObject: any = {
      uid: this.conversationId,
      timestamp: Date.now(),
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    };
    this.conversationProvier.add(messageObject).then((data) => {
      this.doZumbido();
    }).catch((error) => {
      console.log(`error on add: ${error}`);
    });
  }

  getConversation() {
    this.conversationProvier.getById(this.conversationId).valueChanges().subscribe((data) => {
      this.conversation = data;
    }, (error) => {
      console.log(`error on getById: ${error}`);
    });
  }

  getUserNickById(uid) {
    if (uid == this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }

}
