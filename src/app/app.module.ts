import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { AngularFireDatabaseModule} from 'angularfire2/database';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SavePage } from '../pages/save/save';
import { ToastrServiceProvider } from '../providers/toastr-service/toastr-service';
import { CriaContaPage } from '../pages/cria-conta/cria-conta';
import { IonicStorageModule } from '@ionic/storage';
import { HeaderMenuComponent } from '../components/header-menu/header-menu';
import {HeaderMenuSairComponent} from '../components/header-menu-sair/header-menu-sair'
import { TelaHome } from '../pages/HomePage/HomePage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SavePage,
    CriaContaPage,
    TelaHome,
    HeaderMenuComponent

  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),

  
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAH0cdFgVh-RaWsMTPehkwlH-m2JSd4k4k",
      authDomain: "buspass-f5911.firebaseapp.com",
      databaseURL: "https://buspass-f5911.firebaseio.com",
      projectId: "buspass-f5911",
      storageBucket: "buspass-f5911.appspot.com",
      messagingSenderId: "979346406671"
    }),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
  
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SavePage,
    CriaContaPage,
    TelaHome
  
    
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    ToastrServiceProvider,
    
  ]
})
export class AppModule {}
