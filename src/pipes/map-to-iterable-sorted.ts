import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapToIterableSorted',
})
export class MapToIterableSortedPipe implements PipeTransform {
  transform(dict: Object): any[]   {
    var a = [];
    var keys = Object.keys(dict).sort();
    for (let key of keys) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
    }
    return a;
  }
}
