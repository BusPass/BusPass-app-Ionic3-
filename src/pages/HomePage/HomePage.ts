import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ToastrServiceProvider } from '../../providers/toastr-service/toastr-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'firebase/firestore';

import { HomePage } from '../home/home';
import { Profile } from '../../models/Profile';
import { Cartao } from '../../models/Cartao';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-HomePage',
  templateUrl: 'HomePage.html'
})
export class TelaHome {
   public profileData = {} as Profile;
    public cartao = {} as Cartao;
  home = HomePage;
  itemRef;
  private db: any;
 

  constructor(private navCtrl: NavController,
    private menuCtrl: MenuController,
    public dbAuth: AngularFireAuth,
    public dbService: FirebaseServiceProvider,
    public toastrService: ToastrServiceProvider,
    public afDatabase: AngularFireDatabase,
    private storage: Storage

  ) {
    this.db = firebase.firestore();
    
    menuCtrl.enable(true);
  
  }
  ionViewWillLoad() {
    this.dbAuth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
       this.loadData(`${data.uid}`)
       
       
      }

    })


  }
  loadData(id){
    this.getAlldado("profile",id).then((e)=>{
      this.profileData = e;
      
      console.log(this.profileData.NomeCompleto);
      console.log(this.profileData.codigocartao);
      this.storage.set('user-dados', this.profileData);
      // this.storage.get('user-dados')
      // .then((resolve) =>
      // {
      //   console.log(resolve)
      // }
      // );
      this.getcartaoALL("cartoes",this.profileData.codigocartao).then((d)=>{
        this.cartao = d;
        
    
      });
  });

  }
  getAlldado(collection: string, id): Promise<any> {
    return new Promise((resolve, reject) => {
        this.db.collection(collection).doc(id)
            .get()
            .then(function (doc) {
         
             
                    var obj = JSON.parse(JSON.stringify(doc.data()));
                    obj.$key = doc.id
                    console.log(obj)
                 
             

                if (obj != null) {
                    console.log("Document data:", obj);
                    resolve(obj);
                } else {
                    console.log("No such document!");
                    resolve(null);
                }


            })
            .catch((error: any) => {
                reject(error);
            });
    });
}
getcartaoALL(collection: string, cartao): Promise<any>
{
  return new Promise((resolve, reject) => {
    this.db.collection(collection).doc(cartao)
        .get()
        .then(function (doc) {
     
         
                var obj = JSON.parse(JSON.stringify(doc.data()));
                obj.$key = doc.id
                console.log(obj)
             
         

            if (obj != null) {
                console.log("Document data:", obj);
                resolve(obj);
            } else {
                console.log("No such document!");
                resolve(null);
            }


        })
        .catch((error: any) => {
            reject(error);
        });
});


}


  
  public sair(): void
  {
    this.navCtrl.setRoot(this.home);
  }
 
  private exibirToast(mensagem: string): void {
    let toast = this.toastrService.show(mensagem, 3000)
    toast.present();
  }
  simulador()
  { 


  }

}