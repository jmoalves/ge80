import { NgModule } from '@angular/core';

import { MapToIterablePipe } from './map-to-iterable';
import { MapToIterableSortedPipe } from './map-to-iterable-sorted';
import { ReversePipe } from './reverse';

@NgModule({
  declarations: [
    MapToIterablePipe,
    MapToIterableSortedPipe,
    ReversePipe
  ],
  exports: [
    MapToIterablePipe,
    MapToIterableSortedPipe,
    ReversePipe
  ]
})
export class PipesModule { }
