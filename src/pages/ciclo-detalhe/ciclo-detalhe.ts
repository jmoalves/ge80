import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Ciclo } from '../../models/torneio/ciclo';

@IonicPage()
@Component({
  selector: 'page-ciclo-detalhe',
  templateUrl: 'ciclo-detalhe.html',
})
export class CicloDetalhePage {
  ciclo: Ciclo;

  idPatrulha: string;

  subGrupo: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.idPatrulha = navParams.data.idPatrulha;
    this.ciclo = navParams.data.ciclo;

    this.subGrupo = 'reuniao';
  }

  ionViewDidLoad() {
  }

  get initialSlide() {
    let slide = 0;
    for (let id in this.ciclo.patrulha) {
      if (id == this.idPatrulha) {
        return slide;
      }
      slide++;
    }

    return 0;
  }
}
