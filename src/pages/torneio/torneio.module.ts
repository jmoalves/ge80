import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { TorneioMesesPage } from './torneio-meses';

@NgModule({
  declarations: [
    TorneioMesesPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TorneioMesesPage)
  ],
  exports: [
    TorneioMesesPage
  ]
})
export class TorneioMesesPageModule { }
