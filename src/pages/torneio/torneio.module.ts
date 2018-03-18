import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { TorneioPage } from './torneio';

@NgModule({
  declarations: [
    TorneioPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TorneioPage)
  ],
  exports: [
    TorneioPage
  ]
})
export class TorneioPageModule { }
