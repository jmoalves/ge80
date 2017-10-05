import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(src: any[]): any[]   {
    let a:any[] = src;
    a.reverse();
    return a;
  }
}
