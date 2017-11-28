import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrincipalPage } from './principal';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PrincipalPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PrincipalPage)
  ],
})
export class PrincipalPageModule {}
