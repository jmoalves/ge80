import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Storage } from '@ionic/storage';

import { Api } from '../api/api';

import { Patrulha } from '../../models/patrulha'

const PATRULHAS_KEY = 'patrulhas';

@Injectable()
export class PatrulhaProvider {
  data: { [key: string]: Patrulha };
  dataPromise: Promise<any>;

  constructor(private storage: Storage, private api: Api) {
  }

  init() {
    this.dataPromise = this.api.get('patrulhas/patrulhas.json').toPromise();
    this.dataPromise.then(res => {
      // console.log("API GET Patrulhas: " + JSON.stringify(res.json()));

      this.data = res.json();
      for (let key in this.data) {
        this.data[key].avatar = this.api.url + '/patrulhas/' + key + '/avatar.jpg';
      }

      this.storage.set(PATRULHAS_KEY, this.data);
      this.dataPromise = undefined;
    }).catch((err) => {
      console.log("ERROR: " + JSON.stringify(err));
    })
  }

  patrulhas(): Promise<{ [key: string]: Patrulha }> {
    if (!this.dataPromise && this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise<{ [key: string]: Patrulha }>((resolve, reject) => {
      this.dataPromise.then(res => {
        resolve(this.data);
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
        this.storage.get(PATRULHAS_KEY).then((val) => {
          this.data = val;
          console.log("LOADED: " + JSON.stringify(this.data));
          resolve(this.data);
        });
      })
    })
  }

  patrulha(id: string): Promise<Patrulha> {
    if (!this.dataPromise && this.data) {
      return Promise.resolve(this.data[id]);
    }

    return new Promise<Patrulha>((resolve, reject) => {
      this.dataPromise.then(() => {
        return resolve(this.data[id]);
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
        this.storage.get(PATRULHAS_KEY).then((val) => {
          this.data = val;
          console.log("LOADED: " + JSON.stringify(this.data));
          resolve(this.data[id]);
        });
      })
    })
  }
}
