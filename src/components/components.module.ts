import { NgModule } from '@angular/core';
import {  IonicModule } from 'ionic-angular';

import { ProgressBarComponent } from './progress-bar/progress-bar';
import { HelpCardComponent } from './help-card/help-card';

@NgModule({
  declarations: [
    ProgressBarComponent,
    HelpCardComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ProgressBarComponent,
    HelpCardComponent
  ]
})
export class ComponentsModule { }
