import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Patrulha } from '../../models/patrulha';

/*
  Generated class for the PatrulhaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PatrulhaProvider {
  constructor(public http: Http) {
  }

  data: Patrulha[] = [{
    id: "Tirano",
    nome: "Tirano",
    avatar: 'assets/img/patrulhas/tiranossauro.png',
    cor: "#CC9900"
  }, {
    id: "Titano",
    nome: "Titano",
    avatar: 'assets/img/patrulhas/titanossauro.jpg',
    cor: "#006666"
  }, {
    id: "Tri",
    nome: "Tri",
    avatar: 'assets/img/patrulhas/triceratops.jpg',
    cor: "#841F27"
  }, {
    id: "TDS",
    nome: "TDS",
    avatar: 'assets/img/patrulhas/tds.jpg',
    cor: "#006699"
  }];

  patrulhas(): Patrulha[] {
    return this.data;
  }

  patrulha(id: string): Patrulha {
    for (let patrulha of this.data) {
      if (patrulha.id == id) {
        return patrulha;
      }
    }

    return null;
  }
}
