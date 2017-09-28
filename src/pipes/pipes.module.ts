import { NgModule } from '@angular/core';

import { MapToIterablePipe } from './map-to-iterable/map-to-iterable';

@NgModule({
  declarations: [
    MapToIterablePipe
  ],
  exports: [
    MapToIterablePipe
  ]
})
export class PipesModule { }
