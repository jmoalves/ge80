import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { HelpPage } from './help';

@NgModule({
  declarations: [
    HelpPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(HelpPage),
  ],
})
export class HelpPageModule {}
