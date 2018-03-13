import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { TorneioProvider } from '../../providers/torneio/torneio';
import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { Ciclo } from '../../models/torneio/ciclo';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-torneio-meses',
  templateUrl: 'torneio-meses.html'
})
export class TorneioMesesPage {
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
    this.navCtrl.push('TorneioDetalhePage', { ciclo: ciclo, idPatrulha: idPatrulha });
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
