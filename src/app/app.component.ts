import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, ModalController, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ConversationPage } from '../pages/conversation/conversation';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { AuthProvider } from '../providers/auth';
import { UserProvider } from '../providers/user';
import { RequestProvider } from '../providers/request';
import { User } from '../interfaces/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  user: User;
  requests: any;
  mailsShown: any = [];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private authProvider: AuthProvider, public app: App, private userProvider: UserProvider, private requestProvider: RequestProvider, private modalCtrl: ModalController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage }
    ];

    this.authProvider.getStatus().subscribe((session) => {
      this.userProvider.getUserById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.getFriendRequests();
      }, (error) => {
        console.log(`error on getUserById: ${error}`);
      });
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  getFriendRequests() {
    this.requestProvider.getRequestsForEmail(this.user.email).valueChanges().subscribe((requests: any) => {
      this.requests = requests;
      this.requests = this.requests.filter((r) => {
        return r.status !== 'accepted' && r.status !== 'rejected';
      });
      this.requests.forEach((r) => {
        if (this.mailsShown.indexOf(r.sender.email) === -1) {
          this.mailsShown.push(r.sender.email);
          this.showRadio(r);
        }
      });
    }, (error) => {
      console.log(`error on getRequestsForEmail: ${error}`);
    });
  }

  showRadio(r) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Solicitud de amistad');
    alert.setMessage(r.sender.nick + ' te ha enviado una solicitud, deseas aceptar?');
    alert.addInput({
      type: 'radio',
      label: 'Claro',
      value: 'yes',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'No',
      value: 'no'
    });
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data === 'yes') {
          this.requestProvider.setRequestStatus(r, 'accepted').then((data) => {
            this.userProvider.addFriend(this.user.uid, r.sender.uid);
          }).catch((error) => {
            console.log(`error on setRequestStatus: ${error}`);
          });
        } else {
          this.requestProvider.setRequestStatus(r, 'rejected').then((data) => {
            console.log('Solicitud Rechazada');
          }).catch((error) => {
            console.log(`error on setRequestStatus: ${error}`);
          });
        }
      }
    });
    alert.present();
  }

  logout() {
    this.authProvider.logout().then(() => {
      localStorage.removeItem('loginData');
      this.app.getRootNav().setRoot(LoginPage);
    }).catch((error) => {
      console.log(`error on logout: ${error}`);
    });
  }
}
