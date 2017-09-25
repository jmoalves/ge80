import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { TorneioProvider } from '../../providers/torneio/torneio';

@IonicPage()
@Component({
  selector: 'page-torneio',
  templateUrl: 'torneio.html'
})

export class TorneioPage {
  maxPontos: number;

  torneioItems: any[];

  constructor(public navCtrl: NavController, public torneioProvider: TorneioProvider) {
    this.torneioProvider.torneioItems().then(items => {
      this.torneioItems = items;
    })
  }

  ionViewDidLoad() {
  }

  get initialSlide() {
    if (!this.torneioItems) {
      return 0;
    }

    return this.torneioItems.length;
  }

  barClicked(evt, idCiclo, idPatrulha) {
    // console.log("Agora vai! + " + JSON.stringify(evt));
    this.navCtrl.push('CicloDetalhePage', { items: this.torneioItems, idCiclo: idCiclo, idPatrulha: idPatrulha });
  }
}
