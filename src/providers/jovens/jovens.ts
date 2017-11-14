import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { Api } from '../api/api';

import { Jovem } from '../../models/jovem';

const JOVENS_KEY = 'jovens';

@Injectable()
export class JovensProvider {
  data: Jovem[];

  promise: Promise<any>;

  constructor(private storage: Storage, private api: Api) {
  }

  load() {
    this.storage.get(JOVENS_KEY).then((val) => {
      if (!this.data && val) {
        this.data = val;
        console.log("LOADED: " + JSON.stringify(this.data));
      }
    });

    this.promise = this.api.get('jovens', { nonce: (new Date()).getTime() }).toPromise();
    this.promise.then(res => {
      console.log("API GET Jovens: " + JSON.stringify(res.json()));

      let jovens: Jovem[] = res.json();
      this.storage.set(JOVENS_KEY, jovens);
      this.data = jovens;

      console.log("URL GOT: Jovens");

      this.promise = undefined;
    }).catch((err) => {
      console.log("ERROR: " + JSON.stringify(err));
    })
  }

  jovens(): Promise<Jovem[]> {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise<Jovem[]>((resolve, reject) => {
      this.promise.then(res => {
        resolve(this.data);
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
      })
    })
  }
}
