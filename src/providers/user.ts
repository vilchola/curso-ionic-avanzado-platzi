import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private afDB: AngularFireDatabase) {
  }

  getUsers() {
    return this.afDB.list('/users/');
  }

  getUserById(uid) {
    return this.afDB.object('/users/' + uid);
  }

  createUser(user) {
    return this.afDB.database.ref('/users/' + user.uid).set(user);
  }

  editUser(user) {
    return this.afDB.database.ref('/users/' + user.uid).set(user);
  }

}
