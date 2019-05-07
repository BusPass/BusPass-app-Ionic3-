import { Component,ViewChild } from '@angular/core';
import { Nav, MenuController, App } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { ToastrServiceProvider } from '../../providers/toastr-service/toastr-service';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the HeaderMenuSairComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-menu-sair',
  templateUrl: 'header-menu-sair.html'
})
export class HeaderMenuSairComponent {
  @ViewChild('content') nav: Nav;
  text: string;
  home = HomePage;

  constructor(public menuCtrl: MenuController,
    public app: App,  public toastrService: ToastrServiceProvider, public dbAuth: AngularFireAuth) {

  }

  public Sair(): void {
    this.dbAuth.auth.signOut()
      .then(() => {
        this.exibirToast('Você saiu');
        this.menuCtrl.close();
      this.nav.setRoot(this.home);
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
        console.log(erro);
      });
  }
  private exibirToast(mensagem: string): void {
    let toast = this.toastrService.show(mensagem, 3000)
    toast.present();
  }
}
