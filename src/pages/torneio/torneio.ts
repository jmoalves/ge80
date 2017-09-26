import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';

import { TorneioProvider } from '../../providers/torneio/torneio';

@IonicPage()
@Component({
  selector: 'page-torneio',
  templateUrl: 'torneio.html'
})

export class TorneioPage {
  @ViewChild('slideManager') slideManager: Slides;

  torneioItems: any[];

  constructor(public navCtrl: NavController, public torneioProvider: TorneioProvider) {
    var page = this;

    this.torneioProvider.torneioItems().then(function (items) {
      page.torneioItems = items;
      page.slideManager.update();
      console.log("Torneio UPDATE");
    })
  }

  ionViewDidLoad() {
  }

  barClicked(evt, idCiclo, idPatrulha) {
    // console.log("Agora vai! + " + JSON.stringify(evt));
    this.navCtrl.push('CicloDetalhePage', { items: this.torneioItems, idCiclo: idCiclo, idPatrulha: idPatrulha });
  }
}
