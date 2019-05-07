import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TelaHome } from './HomePage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TelaHome,
  ],
  imports: [
    IonicPageModule.forChild(TelaHome),
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    TelaHome
  ]
})
export class HomePageModule {}