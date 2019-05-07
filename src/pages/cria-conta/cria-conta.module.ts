import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriaContaPage } from './cria-conta';

@NgModule({
  declarations: [
    CriaContaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriaContaPage),
  ],
})
export class CriaContaPageModule {}
