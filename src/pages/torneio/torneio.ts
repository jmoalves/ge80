import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { TorneioProvider } from '../../providers/torneio/torneio';

@IonicPage()
@Component({
  selector: 'page-torneio',
  templateUrl: 'torneio.html'
})

export class TorneioPage {
  torneioItems: any[];

  constructor(public navCtrl: NavController, public torneioProvider: TorneioProvider) {
    this.torneioProvider.ciclos().then(ciclos => {
      let items: any[] = [];
      for (let ciclo in ciclos) {
        // console.log("Ciclo: " + JSON.stringify(ciclos[ciclo]));
        let item: any = ciclos[ciclo];
        let patrulhas = ciclos[ciclo].patrulha;
        item.patrulha = [];
        for (let patrulha in patrulhas) {
          // console.log("Patrulha: " + JSON.stringify(patrulhas[patrulha]));
          item.patrulha.push(patrulhas[patrulha]);
        }
        // console.log("Item: " + JSON.stringify(item));
        items.push(item);
      }

      this.torneioItems = items;
      console.log("Torneio UPDATE");
    })
  }

  ionViewDidLoad() {
  }

  get initialSlide() {
    console.log("initial");
    if (this.torneioItems) {
      console.log("Torneio " + this.torneioItems.length);
      return this.torneioItems.length;
    }

    console.log("ZERO Torneio " + this.torneioItems.length);
    return  0;
  }

  barClicked(evt, idCiclo, idPatrulha) {
    // console.log("Agora vai! + " + JSON.stringify(evt));
    this.navCtrl.push('CicloDetalhePage', { items: this.torneioItems, idCiclo: idCiclo, idPatrulha: idPatrulha });
  }
}
