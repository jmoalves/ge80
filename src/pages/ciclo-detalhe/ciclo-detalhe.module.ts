import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CicloDetalhePage } from './ciclo-detalhe';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CicloDetalhePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CicloDetalhePage),
  ],
  exports: [
    CicloDetalhePage
  ]
})
export class CicloDetalhePageModule {}
