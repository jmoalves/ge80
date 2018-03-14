import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private events: Events,
        private firebasePrv: FirebaseProvider) {
    this.events.subscribe(FirebaseProvider.EVT_LOGIN, (user) => {
      // console.log("USR: " + this.firebasePrv.user);
      // if (this.firebasePrv.user) {
      //   this.navCtrl.setRoot('TorneioMesesPage', { ano: "2017"});
      // }
    });

    this.events.subscribe(FirebaseProvider.EVT_LOGOUT, () => {
      // this.navCtrl.setRoot('LoginPage');
    });
  }

  ionViewDidLoad() {
    this.firebasePrv.auth("firebase-auth-container");
  }
}
