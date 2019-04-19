import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  friends: User[];

  constructor() {
    let usuario1: User = {
      nick: 'Henry Vilchez',
      email: 'roberto1286@gmail.com',
      friend: true,
      uid: 1
    };
    let usuario2: User = {
      nick: 'Alejandro Vilchez',
      email: 'ale181085@gmail.com',
      friend: true,
      uid: 2
    };
    let usuario3: User = {
      nick: 'Sebastian Vilchez',
      email: 'hsvbronco@hotmail.com',
      friend: true,
      uid: 3
    };
    let usuario4: User = {
      nick: 'Francisco Vilchez',
      email: 'francisco@elian.com',
      friend: false,
      uid: 4
    };
    let usuario5: User = {
      nick: 'Daniela Henriquez',
      email: 'daniela_henriquez04@hotmail.com',
      friend: false,
      uid: 5
    };
    this.friends = [usuario1, usuario2, usuario3, usuario4, usuario5];
  }

  getFriends() {
    return this.friends;
  }

}
