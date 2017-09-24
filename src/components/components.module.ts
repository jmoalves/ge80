import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ProgressBarComponent } from './progress-bar/progress-bar';

@NgModule({
  declarations: [
    ProgressBarComponent
  ],
  exports: [
    ProgressBarComponent
  ]
})
export class ComponentsModule { }
