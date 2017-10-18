import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';

import { PatrulhaProvider, TorneioProvider, Settings } from '../providers/providers';

@Component({
  template: `
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = 'TorneioPage';

  @ViewChild(Nav) nav: Nav;

  constructor(
    private platform: Platform,
    settings: Settings,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private patrulhaProvider: PatrulhaProvider,
    private torneioProvider: TorneioProvider) {
      this.patrulhaProvider.load();
      this.torneioProvider.load();
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
