import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
        private navCtrl: NavController,
        private events: Events,
        private firebasePrv: FirebaseProvider) {
    this.events.subscribe(FirebaseProvider.EVT_LOGIN, (user) => {
      console.log("USR: " + this.firebasePrv.user);
      if (this.firebasePrv.user) {
        this.navCtrl.setRoot('PrincipalPage', { ano: "2017"});
      }
    });

    this.events.subscribe(FirebaseProvider.EVT_LOGOUT, () => {
      this.navCtrl.setRoot('PrincipalPage');
    });
  }

  ionViewDidLoad() {
    this.firebasePrv.auth("firebase-auth-container");
  }
}
