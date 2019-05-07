import { Component,ViewChild } from '@angular/core';
import { Platform,NavController, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Profile } from '../models/Profile';
 import { TelaHome } from '../pages/HomePage/HomePage';
import { Storage } from '@ionic/storage';
import { ToastrServiceProvider } from '../providers/toastr-service/toastr-service';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild('#nav') nav: NavController;
  rootPage: any =   HomePage ;
  home = HomePage;
  dados = {} as Profile;
  cartao: any;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage: Storage,
    private menuCtrl: MenuController, public toastrService: ToastrServiceProvider, public dbAuth: AngularFireAuth, 
    public appCtrl: App, ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
      this.storage.get('user-dados')
      .then((resolve) =>
      {
        this.dados = resolve;
        console.log(this.dados)
      }
      );
      
  }
  openMenu() {
    this.menuCtrl.open();
    
  }

  closeMenu() {
    this.menuCtrl.close();
    this.nav.setRoot(this.home);
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
    Sair() {
    this.dbAuth.auth.signOut()
      .then(() => {
        this.exibirToast('Você saiu');
        this.nav.setRoot(HomePage);
     
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }
  private exibirToast(mensagem: string): void {
    let toast = this.toastrService.show(mensagem, 3000)
    toast.present();
  }
}

