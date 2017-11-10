import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Settings } from '../../models/settings';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class SettingsProvider {
  private SETTINGS_KEY: string = '_settings';

  settings: Settings;

  _defaults: Settings;
  _readyPromise: Promise<Settings>;

  constructor(public storage: Storage, defaults: Settings) {
    this._defaults = defaults;
    this.settings = {};
  }

  load() {
    return this.storage.get(this.SETTINGS_KEY).then((value) => {
      if (value) {
        this.settings = value;
        return this._mergeDefaults(this._defaults);
      } else {
        return this.setAll(this._defaults).then((val) => {
          this.settings = val;
        })
      }
    });
  }

  _mergeDefaults(defaults: Settings) {
    for (let k in defaults) {
      if (!(k in this.settings)) {
        this.settings[k] = defaults[k];
      }
    }
    return this.setAll(this.settings);
  }

  merge(settings: Settings) {
    for (let k in settings) {
      this.settings[k] = settings[k];
    }
    return this.save();
  }

  setValue(key: string, value: any) {
    this.settings[key] = value;
    return this.storage.set(this.SETTINGS_KEY, this.settings);
  }

  setAll(value: Settings) {
    return this.storage.set(this.SETTINGS_KEY, value);
  }

  getValue(key: string) {
    if (this.settings[key]) {
      return this.settings[key];
    }

    return this._defaults[key];
  }

  save() {
    return this.setAll(this.settings);
  }

  get allSettings() {
    return this.settings;
  }
}
