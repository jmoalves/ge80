import { NgModule } from '@angular/core';
import {  IonicModule } from 'ionic-angular';

import { ProgressBarComponent } from './progress-bar/progress-bar';
import { HelpCardComponent } from './help-card/help-card';
import { AppHeaderComponent } from './app-header/app-header';

@NgModule({
  declarations: [
    ProgressBarComponent,
    HelpCardComponent,
    AppHeaderComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ProgressBarComponent,
    HelpCardComponent,
    AppHeaderComponent
  ]
})
export class ComponentsModule { }
