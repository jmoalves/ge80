import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';

import { Patrulha } from '../../models/patrulha'
/*
  Generated class for the PatrulhaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PatrulhaProvider {
  data: { [key: string]: Patrulha };
  dataPromise: Promise<any>;

  constructor(public http: Http, public api: Api) {
  }

  init() {
    this.dataPromise = this.api.get('patrulhas/patrulhas.json').toPromise();
    this.dataPromise.then(res => {
      console.log("API GET Patrulhas: " + JSON.stringify(res.json()));

      this.data = res.json();
      for (let key in this.data) {
        this.data[key].avatar = this.api.url + '/patrulhas/' + key + '/avatar.jpg';
      }

      this.dataPromise = undefined;
    });
  }

  patrulhas(): Promise<{ [key: string]: Patrulha }> {
    if (!this.dataPromise && this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise<{ [key: string]: Patrulha }>((resolve, reject) => {
      this.dataPromise.then(res => {
        resolve(this.data);
      });
    })
  }

  patrulha(id: string): Promise<Patrulha> {
    if (!this.dataPromise && this.data) {
      return Promise.resolve(this.data[id]);
    }

    return new Promise<Patrulha>((resolve, reject) => {
      this.dataPromise.then(() => {
        return resolve(this.data[id]);
      })
    })
  }
}
