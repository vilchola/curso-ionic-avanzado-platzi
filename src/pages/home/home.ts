import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
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
    this.userProvider.getUsers().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
    }, (error) => {
      console.log(`error on getUsers: ${error}`);
    });
    this.authProvider.getStatus().subscribe((session) => {
      if (!session) {
        return;
      }
      if (!session.uid) {
        return;
      }
      this.userProvider.getUserById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.user.friends = Object.keys(this.user.friends).map(key => this.user.friends[key]);
        console.log('user', this.user);
      }, (error) => {
        console.log(`error on getUserById: ${error}`);
      });
    }, (error) => {
      console.log(`error on getStatus: ${error}`);
    });
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
