import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

import { TorneioPage } from './torneio';

@NgModule({
  declarations: [
    TorneioPage
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(TorneioPage),
    TranslateModule.forChild()
  ],
  exports: [
    TorneioPage
  ]
})
export class TorneioPageModule { }
