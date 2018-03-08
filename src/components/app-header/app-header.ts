import { Component, Input } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the AppHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {
  @Input('withoutLogin') withoutLogin;

  constructor(private firebasePrv: FirebaseProvider, private navCtrl: NavController) {
  }

  get loggedIn():boolean {
    return this.firebasePrv.isAuthenticated();
  }

  get loggedOut():boolean {
    return !this.loggedIn;
  }

  get user() {
    return this.firebasePrv.user;
  }

  get showLogin():boolean {
    if (this.withoutLogin || this.withoutLogin == '') {
      return false;
    }

    return this.loggedOut;
  }

  get showLogout():boolean {
    return this.loggedIn;
  }

  login(event) {
    if (!this.showLogin) {
      return;
    }

    this.navCtrl.setRoot('LoginPage');
  }

  logout(event) {
    this.firebasePrv.logout();
  }
}
