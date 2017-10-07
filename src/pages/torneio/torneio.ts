import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';

import { TorneioProvider } from '../../providers/torneio/torneio';
import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { Ciclo } from '../../models/torneio/ciclo';

@IonicPage()
@Component({
  selector: 'page-torneio',
  templateUrl: 'torneio.html'
})
export class TorneioPage {
  @ViewChild('slides') slides:Slides;
  torneioItems: Ciclo[] = [];

  constructor(public navCtrl: NavController, private torneioProvider: TorneioProvider, private patrulaProvider: PatrulhaProvider) {
    this.torneioProvider.ciclos().then(ciclos => {
      this.torneioItems = ciclos;
    });
  }

  ionViewDidLoad() {
  }

  barClicked(evt, ciclo, idPatrulha) {
    // console.log("Para detalhe => " + JSON.stringify(evt) + " Ciclo: " + idCiclo + " Patrulha: " + idPatrulha);
    this.navCtrl.push('CicloDetalhePage', { ciclo: ciclo, idPatrulha: idPatrulha });
  }

  refresh(evt) {
    console.log("REFRESH - Begin",  evt);
    this.patrulaProvider.load();
    this.torneioProvider.reload();

    this.torneioProvider.ciclos().then((ciclos) => {
      this.torneioItems = ciclos;
      console.log("REFRESH - END");
      this.slides.update();
    });
  }
}
