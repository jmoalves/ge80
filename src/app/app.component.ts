import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';

import { PatrulhaProvider, JovensProvider, TorneioProvider, SettingsProvider } from '../providers/providers';
import { FirebaseProvider } from '../providers/firebase/firebase';

@Component({
  template: `
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = 'PrincipalPage';

  @ViewChild(Nav) nav: Nav;

  constructor(
    private platform: Platform,
    private settings: SettingsProvider,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private firebasePrv: FirebaseProvider,
    private jovensPrv: JovensProvider,
    private patrulhaProvider: PatrulhaProvider,
    private torneioProvider: TorneioProvider) {
      this.settings.load();
      this.settings.save();
      this.patrulhaProvider.load();
      this.jovensPrv.load();
      this.torneioProvider.load();
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.firebasePrv.auth("firebase-auth-container");
      this.firebasePrv.onAuthStateChanged().then(user => {
      });
    });
  }
}
