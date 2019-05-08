import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/login/login.module';
import { ConversationPageModule } from '../pages/conversation/conversation.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { AboutPageModule } from '../pages/about/about.module';
import { UserProvider } from '../providers/user';
import { SearchPipe } from '../pipes/search';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AuthProvider } from '../providers/auth';
import { Camera } from '@ionic-native/camera';

export const firebaseConfig = {
  apiKey: "AIzaSyAzQa9hP3qK8W6QVjRLSp049I9Wpb0GoUY",
  authDomain: "platzinger-4a1ef.firebaseapp.com",
  databaseURL: "https://platzinger-4a1ef.firebaseio.com",
  projectId: "platzinger-4a1ef",
  storageBucket: "platzinger-4a1ef.appspot.com",
  messagingSenderId: "556223442532"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    ConversationPageModule,
    ProfilePageModule,
    AboutPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider,
    Camera
  ]
})
export class AppModule {}
