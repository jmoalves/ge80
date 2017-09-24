import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TorneioPage } from './torneio';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TorneioPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TorneioPage),
    TranslateModule.forChild()
  ],
  exports: [
    TorneioPage
  ]
})
export class TorneioPageModule { }
