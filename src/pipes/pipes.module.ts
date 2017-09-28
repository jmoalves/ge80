import { NgModule } from '@angular/core';

import { MapToIterablePipe } from './map-to-iterable';
import { MapToIterableSortedPipe } from './map-to-iterable-sorted';

@NgModule({
  declarations: [
    MapToIterablePipe,
    MapToIterableSortedPipe
  ],
  exports: [
    MapToIterablePipe,
    MapToIterableSortedPipe
  ]
})
export class PipesModule { }
