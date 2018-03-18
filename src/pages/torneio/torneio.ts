import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { TorneioProvider } from '../../providers/torneio/torneio';
import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { Ciclo } from '../../models/torneio/ciclo';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage({
  segment: 'torneio'
})
@Component({
  selector: 'page-torneio',
  templateUrl: 'torneio.html'
})
export class TorneioPage {
  anos: string[] = null;
  data: any = null;

  constructor(
      private navCtrl: NavController,
      private firebasePrv: FirebaseProvider,
      private torneioProvider: TorneioProvider,
      private patrulaProvider: PatrulhaProvider) {
    console.log('TorneioPage');

    this.torneioProvider.anos().then(anos => {
      this.data = anos;
      this.anos = Object.keys(anos);
    });
  }

  ionViewDidLoad() {
  }

  mes(evt, ano) {
    // console.log("Para detalhe => " + JSON.stringify(evt) + " Ciclo: " + idCiclo + " Patrulha: " + idPatrulha);
    this.navCtrl.push('TorneioMesesPage', { ano: ano });
  }
}
