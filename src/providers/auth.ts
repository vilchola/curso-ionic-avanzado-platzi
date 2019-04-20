import { Injectable } from '@angular/core';
import { AngularFireAuth } from'angularfire2/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getStatus() {
    return this.afAuth.authState;
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
