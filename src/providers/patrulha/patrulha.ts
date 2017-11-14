import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Storage } from '@ionic/storage';

import { Api } from '../api/api';

import { Patrulha } from '../../models/patrulha'

const PATRULHAS_KEY = 'patrulhas';

@Injectable()
export class PatrulhaProvider {
  data: Patrulha[];
  index: { [key:string]: Patrulha };

  promise: Promise<any>;

  constructor(private storage: Storage, private api: Api) {
  }

  load() {
    this.storage.get(PATRULHAS_KEY).then((val) => {
      if (!this.data && val) {
        this.data = val;
        console.log("LOADED: " + JSON.stringify(this.data));
      }
    });

    this.promise = this.api.get('patrulhas', { nonce: (new Date()).getTime() }).toPromise();
    this.promise.then(res => {
      console.log("API GET Patrulhas: " + JSON.stringify(res.json()));

      let patrulhas: Patrulha[] = res.json();
      for (let patrulha of patrulhas) {
        patrulha.avatar = this.api.url + '/patrulhas/' + patrulha.id + '/avatar.jpg';
      }

      this.storage.set(PATRULHAS_KEY, patrulhas);
      this.index = this.geraIndice(patrulhas);
      this.data = patrulhas;

      console.log("URL GOT: patrulhas");

      this.promise = undefined;
    }).catch((err) => {
      console.log("ERROR: " + JSON.stringify(err));
    })
  }

  patrulhas(): Promise<Patrulha[]> {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise<Patrulha[]>((resolve, reject) => {
      this.promise.then(res => {
        resolve(this.data);
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
      })
    })
  }

  patrulha(id: string): Promise<Patrulha> {
    if (this.index) {
      return Promise.resolve(this.index[id]);
    }

    return new Promise<Patrulha>((resolve, reject) => {
      this.promise.then(() => {
        return resolve(this.index[id]);
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
      })
    })
  }

  geraIndice(patrulhas:Patrulha[]): { [ key: string]: Patrulha } {
    let indice:{ [ key: string]: Patrulha } = {};

    for (let key in patrulhas) {
      let id:string = patrulhas[key].id;
      indice[id] = patrulhas[key];
    }

    return indice;
  }
}
