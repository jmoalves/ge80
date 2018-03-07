import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { TorneioProvider } from '../../providers/torneio/torneio';
import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { Ciclo } from '../../models/torneio/ciclo';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-torneio',
  templateUrl: 'torneio.html'
})
export class TorneioPage {
  torneioItems: Ciclo[] = [];

  constructor(
      private navCtrl: NavController,
      private firebasePrv: FirebaseProvider,
      private torneioProvider: TorneioProvider,
      private patrulaProvider: PatrulhaProvider) {

    if (!this.firebasePrv.isAuthenticated()) {
      this.navCtrl.setRoot('LoginPage');
      return;
    }

    this.torneioProvider.ciclos().then(ciclos => {
      this.torneioItems = ciclos;
    });
  }

  ionViewDidLoad() {
  }

  detail(evt, ciclo, idPatrulha) {
    // console.log("Para detalhe => " + JSON.stringify(evt) + " Ciclo: " + idCiclo + " Patrulha: " + idPatrulha);
    this.navCtrl.push('CicloDetalhePage', { ciclo: ciclo, idPatrulha: idPatrulha });
  }

  help(evt) {
    this.navCtrl.push('HelpPage');
  }

  refresh(evt) {
    console.log("REFRESH - Begin",  evt);
    this.patrulaProvider.load();
    this.torneioProvider.reload();

    this.torneioProvider.ciclos().then((ciclos) => {
      this.torneioItems = ciclos;
      console.log("REFRESH - END");
    });
  }
}
