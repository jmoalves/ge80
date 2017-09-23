import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TorneioPage } from './torneio';

import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';


@NgModule({
  declarations: [
    ProgressBarComponent,
    TorneioPage
  ],
  imports: [
    IonicPageModule.forChild(TorneioPage),
    TranslateModule.forChild()
  ],
  exports: [
    TorneioPage
  ]
})
export class TorneioPageModule { }
