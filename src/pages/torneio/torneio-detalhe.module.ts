import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { TorneioDetalhePage } from './torneio-detalhe';

@NgModule({
  declarations: [
    TorneioDetalhePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TorneioDetalhePage)
  ],
  exports: [
    TorneioDetalhePage
  ]
})
export class TorneioDetalhePageModule { }
