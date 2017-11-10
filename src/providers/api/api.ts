import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';

import { SettingsProvider } from '../settings/settings';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = '/api';

  constructor(public http: Http, settings:SettingsProvider) {
    let value = settings.getValue("apiURL");
    if (value) {
      this.url = value + "/api";
    }
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    console.log("GET " + this.url + '/' + endpoint);
    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    console.log("POST " + this.url + '/' + endpoint);
    console.log(JSON.stringify(body));
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    console.log("PUT " + this.url + '/' + endpoint);
    console.log(JSON.stringify(body));
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    console.log("DELETE " + this.url + '/' + endpoint);
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    console.log("patch " + this.url + '/' + endpoint);
    console.log(JSON.stringify(body));
    return this.http.patch(this.url + '/' + endpoint, body, options);
  }
}
