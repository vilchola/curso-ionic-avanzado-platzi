import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private afDB: AngularFireDatabase, private afStorage: AngularFireStorage) {
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

  uploadPicture(picture_name, image) {
    return this.afStorage.ref('/pictures/' + picture_name).putString(image, 'data_url');
  }

  getDownloadURL(picture_name) {
    return this.afStorage.ref('/pictures/' + picture_name).getDownloadURL();
  }

  addFriend(uid, friendId) {
    this.afDB.object('/users/' + uid + '/friends/' + friendId).set(friendId);
    return this.afDB.object('/users/' + friendId + '/friends/' + uid).set(uid);
  }

}
