import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';

import { TorneioProvider } from '../../providers/torneio/torneio';
import { Ciclo } from '../../models/torneio/ciclo';

@IonicPage()
@Component({
  selector: 'page-torneio',
  templateUrl: 'torneio.html'
})
export class TorneioPage {
  @ViewChild('slideMgr') slides: Slides;

  torneioItems: { [key: string]: Ciclo };
  qtdItems: number;

  constructor(public navCtrl: NavController, public torneioProvider: TorneioProvider) {
    this.torneioProvider.ciclos().then(ciclos => {
      this.torneioItems = ciclos;
      this.qtdItems = Object.keys(ciclos).length;
    })
  }

  ionViewDidLoad() {
    this.slides.update();
  }

  get initialSlide() {
    if (this.qtdItems) {
      return this.qtdItems;
    }
  }

  barClicked(evt, idCiclo, idPatrulha) {
    // console.log("Para detalhe => " + JSON.stringify(evt) + " Ciclo: " + idCiclo + " Patrulha: " + idPatrulha);
    this.navCtrl.push('CicloDetalhePage', { items: this.torneioItems, idCiclo: idCiclo, idPatrulha: idPatrulha });
  }
}
