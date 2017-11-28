import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Firebase
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import config from './firebase-config'

@Injectable()
export class FirebaseProvider {
  private userData: any= null;
  private tokenData: any = null;

  constructor() {
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.userData = user;
        user.getIdToken().then((accessToken) => {
          this.tokenData = accessToken;
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  get user() {
    return this.userData;
  }

  get token() {
    return this.tokenData;
  }

  onAuthStateChanged(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        resolve(this.userData);
      });
    });
  }

  auth(widgetID:string) {
    var uiConfig = {
      signInSuccessUrl: '/#/principal',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ] //,
      // // Terms of service url.
      // tosUrl: '<your-tos-url>'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#' + widgetID, uiConfig);
  }
}
