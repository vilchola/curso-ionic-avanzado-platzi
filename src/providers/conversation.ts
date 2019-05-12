import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the ConversationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConversationProvider {

  constructor(private afDB: AngularFireDatabase) {
  }

  add(conversation) {
    return this.afDB.object('/conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }

  getById(uid) {
      return this.afDB.list('/conversations/' + uid);
  }

}
