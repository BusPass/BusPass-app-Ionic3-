import { Component  } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ToastrServiceProvider } from '../../providers/toastr-service/toastr-service';
import { AngularFireAuth } from 'angularfire2/auth';

import { TelaHome } from '../HomePage/HomePage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CriaContaPage } from '../cria-conta/cria-conta';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tela = TelaHome;
  loginForm: FormGroup;
  criaConta = CriaContaPage;
  public user: any;
  //  @ViewChild('usuario') email;
  //  @ViewChild('senha') password;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dbService: FirebaseServiceProvider,
    public toastrService: ToastrServiceProvider,
    public dbAuth: AngularFireAuth,
    public formbuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    this.loginForm = this.formbuilder.group({

      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
    dbAuth.user.subscribe((data => {
      this.user = data;
    }));
  }
  public LoginComEmail(): void {
    const loader = this.loadingCtrl.create({
      content: "Aguarde"
    });
    loader.present();
    this.dbAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then((dados) => {
        
      this.storage.set('user', dados.user.uid)
      .then(() =>
      {
        loader.dismiss();
        this.exibirToast('Login efetuado com sucesso');
        this.navCtrl.push( this.tela, {}, { animate: true, direction: 'forward' });
      })
       
      })
      .catch((erro: any) => {
        
        var erroPT = "";
        console.log(erro);
        if (erro.code == "auth/network-request-failed") {
          erroPT = "Sem conexão, verifique se você está conectado a internet";
        }
        else if (erro.code == "auth/invalid-email") {
          erroPT = "Email invalido";
        }
        else if (erro.code == "auth/user-not-found") {
          erroPT = "Desculpa... seu email não esta no nosso banco de dados";
        }
        else if (erro.code == "auth/wrong-password") {
          erroPT = "Senha invalida";
        }
        loader.dismiss();
        this.exibirToast(erroPT);
      });
  }
  criarconta = () => this.navCtrl.setRoot(this.criaConta, {}, { animate: true, direction: 'forward' });
  private exibirToast(mensagem: string): void {
    let toast = this.toastrService.show(mensagem, 4000)
    toast.present();
  }

}
