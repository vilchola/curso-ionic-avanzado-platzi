import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {

  constructor(private afDB: AngularFireDatabase) {
  }

  createRequest(request) {
    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.afDB.object('/requests/' + cleanEmail + '/' + request.sender.uid).set(request);
  }

  setRequestStatus(request, status) {
    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.afDB.object('/requests/' + cleanEmail + '/' + request.sender.uid + '/status').set(status);
  }

  getRequestsForEmail(email) {
    const cleanEmail = email.replace('.', ',');
    return this.afDB.list('/requests/' + cleanEmail);
  }

}
