import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Ciclo } from '../../models/torneio/ciclo';

@IonicPage()
@Component({
  selector: 'page-ciclo-detalhe',
  templateUrl: 'ciclo-detalhe.html',
})
export class CicloDetalhePage {
  torneioItems: { [key: string]: Ciclo };

  idCiclo: string;
  idPatrulha: string;

  subGrupo: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.idCiclo = navParams.data.idCiclo;
    this.idPatrulha = navParams.data.idPatrulha;
    this.torneioItems = navParams.data.items;

    this.subGrupo = 'reuniao';
  }

  ionViewDidLoad() {
  }

  get item() {
    let item = this.torneioItems[this.idCiclo];
    // console.log("Geral: " + JSON.stringify(this.torneioItems));
    // console.log("ID...: " + JSON.stringify(this.idCiclo));
    // console.log("ITEM.: " + JSON.stringify(item));
    return item;
  }

  get initialSlide() {
    let slide = 0;
    for (let id in this.item.patrulha) {
      if (id == this.idPatrulha) {
        return slide;
      }
      slide++;
    }

    return 0;
  }
}
