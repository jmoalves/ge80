import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';

import { Patrulha } from '../../models/patrulha';

/*
  Generated class for the PatrulhaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PatrulhaProvider {
  data: Patrulha[];

  dataPromise: Promise<any>;

  constructor(public http: Http, public api: Api) {
    this.loadPatrulha();
  }

  loadPatrulha() {
    this.dataPromise = this.api.get('patrulhas/patrulhas.json').toPromise();
    this.dataPromise.then(res => {
      console.log("API GET Patrulhas: " + JSON.stringify(res.json()));

      this.data = [];
      for (let patrulha of res.json()) {
        this.data.push({
          id: patrulha.id,
          nome: patrulha.nome,
          avatar: this.api.url + '/patrulhas/' + patrulha.id + '/avatar.jpg',
          cor: patrulha.cor
        })
      }

      this.dataPromise = undefined;
    });
  }

  // data: Patrulha[] = [{
  //   id: "Tirano",
  //   nome: "Tirano",
  //   avatar: 'assets/img/patrulhas/tiranossauro.png',
  //   cor: "#CC9900"
  // }, {
  //   id: "Titano",
  //   nome: "Titano",
  //   avatar: 'assets/img/patrulhas/titanossauro.jpg',
  //   cor: "#006666"
  // }, {
  //   id: "Tri",
  //   nome: "Tri",
  //   avatar: 'assets/img/patrulhas/triceratops.jpg',
  //   cor: "#841F27"
  // }, {
  //   id: "TDS",
  //   nome: "TDS",
  //   avatar: 'assets/img/patrulhas/tds.jpg',
  //   cor: "#006699"
  // }];

  patrulhas(): Promise<Patrulha[]> {
    if (!this.dataPromise && this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise<Patrulha[]>((resolve, reject) => {
      this.dataPromise.then(res => {
        resolve(this.data);
      });
    })
  }

  patrulha(id: string): Promise<Patrulha> {
    return new Promise<Patrulha>((resolve, reject) => {
      this.patrulhas().then(patrulhas => {
        for (let patrulha of this.data) {
          if (patrulha.id == id) {
            return resolve(patrulha);
          }
        }

        return resolve(null);
      })
    })
  }
}
