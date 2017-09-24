import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CicloDetalhePage } from './ciclo-detalhe';

@NgModule({
  declarations: [
    CicloDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(CicloDetalhePage),
  ],
  exports: [
    CicloDetalhePage
  ]
})
export class CicloDetalhePageModule {}
