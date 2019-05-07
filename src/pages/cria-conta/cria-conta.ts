import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, } from 'ionic-angular';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ToastrServiceProvider } from '../../providers/toastr-service/toastr-service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/firestore';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateConfirmPassword } from '../../validators/confirmPassword';

import { Cartao } from '../../models/Cartao';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-cria-conta',
  templateUrl: 'cria-conta.html',
})
export class CriaContaPage {
  profile = {} as Profile;
  cartao = {} as Cartao;
  private db: any;
  registerForm: FormGroup;
  home = HomePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public toastrService: ToastrServiceProvider,
    public afDatabase: AngularFireDatabase,

  ) {
    this.db = firebase.firestore();
    this.registerForm = this.formbuilder.group({
      nome: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6), ValidateConfirmPassword]],
      codigocartao: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    })

  }
  public cadastrarUsuario(): void {

    this.profile.NomeCompleto = this.registerForm.value.nome;
    this.profile.email = this.registerForm.value.email;
    this.profile.senha = this.registerForm.value.password;
    this.profile.confSenha = this.registerForm.value.confirmPassword;
    this.profile.codigocartao = this.registerForm.value.codigocartao;

    this.afAuth.auth.createUserWithEmailAndPassword(this.profile.email, this.profile.senha)
      .then(() => {
        this.createProfile();
        this.criarCartao();
        this.presentAlert('Usuário cadastrado', this.profile.NomeCompleto + ' cadastrado com sucesso.');
        this.navCtrl.setRoot(this.home, {}, { animate: true, direction: 'forward' });
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  
  createProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      var userref = this.db.collection("profile");
      userref.doc(`${auth.uid}`).set(this.profile);


    })

  }


  
  criarCartao() {

    this.afAuth.authState.take(1).subscribe(auth => {
      var cartaoRef = this.db.collection("cartoes");
      this.cartao.NomeCompleto = this.profile.NomeCompleto;
      this.cartao.idUser = `${auth.uid}`;
      this.cartao.saldo = 0;
      cartaoRef.doc(this.profile.codigocartao).set(this.cartao);


    })
  }
  volta() {
    this.navCtrl.setRoot(this.home, {}, { animate: true, direction: 'forward' });
  }
 
  private exibirToast(mensagem: string): void {
    let toast = this.toastrService.show(mensagem, 3000)
    toast.present();
  }
  presentAlert(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
