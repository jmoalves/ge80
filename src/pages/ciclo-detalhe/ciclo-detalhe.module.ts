import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CicloDetalhePage } from './ciclo-detalhe';

import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CicloDetalhePage
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(CicloDetalhePage),
  ],
  exports: [
    CicloDetalhePage
  ]
})
export class CicloDetalhePageModule {}
