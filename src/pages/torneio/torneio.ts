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

  constructor(public navCtrl: NavController, public torneioProvider: TorneioProvider) {
    this.torneioProvider.ciclos().then(ciclos => {
      this.torneioItems = ciclos;
    })
  }

  ionViewDidLoad() {
    this.slides.update();
  }

  get initialSlide() {
    if (this.torneioItems) {
      let qtd = 0;
      for (let x in this.torneioItems) {
        qtd++;
      }
      return qtd;
    }
  }

  barClicked(evt, idCiclo, idPatrulha) {
    console.log("Agora vai! + " + JSON.stringify(evt) + " Ciclo: " + idCiclo + " Patrulha: " + idPatrulha);
    this.navCtrl.push('CicloDetalhePage', { items: this.torneioItems, idCiclo: idCiclo, idPatrulha: idPatrulha });
  }
}
