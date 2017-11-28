import { Component } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';

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
  constructor(private firebasePrv: FirebaseProvider) {
  }
  get user() {
    return JSON.stringify(this.firebasePrv.user, null, 3);
  }

  get photoURL() {
    if (this.firebasePrv.user) {
      return this.firebasePrv.user.photoURL;
    } else {
      return "";
    }
  }

  get name() {
    if (this.firebasePrv.user) {
      return this.firebasePrv.user.displayName;
    } else {
      return "";
    }
  }

}
