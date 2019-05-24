import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { User, Status } from '../../interfaces/user';
import { UserProvider } from '../../providers/user';
import { AuthProvider } from '../../providers/auth';
import { RequestProvider } from '../../providers/request';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: User[];
  query: string;
  status: Status;
  user: User;

  constructor(public navCtrl: NavController, private userProvider: UserProvider, private authProvider: AuthProvider, private alertCtrl: AlertController, private requestProvider: RequestProvider, public toasrCtrl: ToastController) {
    this.authProvider.getStatus().subscribe((data) => {
      this.userProvider.getUserById(data.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
      }, (error) => {
        console.log(`error on getUserById: ${error}`);
      });
      this.userProvider.getUsers().valueChanges().subscribe((data: User[]) => {
        this.friends = data;
      }, (error) => {
        console.log(`error on getUsers: ${error}`);
      });
    }, (error) => {
      console.log(`error on getStatus: ${error}`);
    });
  }

  goToConversation(user: User) {
    this.navCtrl.push(ConversationPage, {user: user});
  }

  getIconByStatus(status) {
    let icon = '';
    switch (status) {
      case Status.Online:
        icon = 'logo_live_online.png';
        break;
      case Status.Offline:
        icon = 'logo_live_offline.png';
        break;
      case Status.Busy:
        icon = 'logo_live_busy.png';
        break;
      case Status.AppearOffline:
        icon = 'logo_live_appear_offline.png';
        break;
      case Status.Away:
        icon = 'logo_live_away.png';
        break;
    }
    return icon;
  }

  isOffline(status) {
    return status == Status.Offline || status == Status.AppearOffline;
  }

  sendRequest() {
    const prompt = this.alertCtrl.create({
      title: 'Agregar Amigo',
      message: 'Ingresar email del amigo para agregar',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            const request = {
              timestamp: Date.now(),
              receiver_email: data.email,
              sender: this.user,
              status: 'pending'
            };
            this.requestProvider.createRequest(request).then((data) => {
              let toast = this.toasrCtrl.create({
                message: 'Solicitud Enviada',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }).catch((error) => {
              console.log(`error on createRequest: ${error}`);
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
