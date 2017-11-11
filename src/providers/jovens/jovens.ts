import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Jovem } from '../../models/jovem';
/*
  Generated class for the JovensProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JovensProvider {

  constructor(public http: Http) {
  }

  jovens(): Promise<Jovem[]> {
    return Promise.resolve([{
      patrulha: 'tirano',
      nome: 'Otto Oliveira',
      cargo: 'Monitor'
    }]);
  }
}
