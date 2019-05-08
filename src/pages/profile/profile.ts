import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { AuthProvider } from '../../providers/auth';
import { UserProvider } from '../../providers/user';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User;
  pictureId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private userProvider: UserProvider, private camera: Camera, private toastCtrl: ToastController, private geolocation: Geolocation, private httpClient: HttpClient) {
    this.authProvider.getStatus().subscribe((data) => {
      this.userProvider.getUserById(data.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
      }, (error) => {
        console.log(`error on getUserById: ${error}`);
      });
    }, (error) => {
      console.log(`error on getStatus: ${error}`);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  saveData() {
    this.userProvider.editUser(this.user).then(() => {
      alert('Usuario editado');
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      console.log(`error on editUser: ${error}`);
    });
  }

  async takePicture(source) {
    try {
      let cameraOptions: CameraOptions = {
        quality: 50,
        targetWidth: 800,
        targetHeight: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        allowEdit: true
      };
      cameraOptions.sourceType = (source === 'camera') ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY;
      const result = await this.camera.getPicture(cameraOptions);
      const image = 'data:image/jpeg;base64,' + result;
      this.pictureId = Date.now();
      this.userProvider.uploadPicture(this.pictureId + '.jpg', image).then((data) => {
        this.userProvider.getDownloadURL(this.pictureId + '.jpg').subscribe((url) => {
          this.user.avatar = url;
          let toast = this.toastCtrl.create({
            message: 'Foto subida',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }, (error) => {
          console.log(`error on getDownloadURL: ${error}`);
        });
      }).catch((error) => {
        console.log(`error on uploadPicture: ${error}`);
      });
    } catch (e) {
      console.error(e);
    }
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((response) => {
      console.log(response);
      let toast = this.toastCtrl.create({
        message: 'Latitud: ' + response.coords.latitude + ' / Longitud: ' + response.coords.longitude,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }).catch((error) => {
      console.log(`error on getCurrentPosition: ${error}`);
    });
  }

}
