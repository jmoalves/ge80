import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import 'rxjs/add/operator/map';

// Firebase
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import * as config from './firebase-config.json';

@Injectable()
export class FirebaseProvider {
  public static EVT_LOGIN = "auth:login";
  public static EVT_LOGOUT = "auth:logout";

  // private userData: any = null;
  private ui: any = null;
  private tokenData: any = null;

  constructor(private events: Events) {
    firebase.initializeApp(config);
  }

  get user() {
    return firebase.auth().currentUser;
  }

  get token() {
    return this.tokenData;
  }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  auth(widgetID: string) {
    var uiConfig = {
      signInSuccessUrl: '/#/login',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ] //,
      // // Terms of service url.
      // tosUrl: '<your-tos-url>'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    let promise = firebase.auth();
    promise.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // console.log("Auth OK - " + JSON.stringify(user, null, 3));

        // this.userData = user;
        user.getIdToken().then((accessToken) => {
          this.tokenData = accessToken;
        });

        this.events.publish(FirebaseProvider.EVT_LOGIN, this.user);
      }
    }, (error) => {
      console.log(error);
    });

    if (!this.ui) {
      this.ui = new firebaseui.auth.AuthUI(promise);
    };

    // The start method will wait until the DOM is loaded.
    this.ui.start('#' + widgetID, uiConfig);
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.tokenData = null;
      this.events.publish(FirebaseProvider.EVT_LOGOUT);
    }).catch((error) => {

    });
  }


}
