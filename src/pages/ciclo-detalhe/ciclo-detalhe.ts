import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Patrulha } from '../../models/patrulha';
import { PontuacaoPatrulha } from '../../models/cicloTorneioPontuacao';

/**
 * Generated class for the CicloDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ciclo-detalhe',
  templateUrl: 'ciclo-detalhe.html',
})
export class CicloDetalhePage {
  torneioItems: any[];
  item: any;

  idCiclo: string;
  idPatrulha: string;

  subGrupo: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.idCiclo = navParams.data.idCiclo;
    this.idPatrulha = navParams.data.idPatrulha;

    this.torneioItems = navParams.data.items;

    for (let item of this.torneioItems) {
      if (item.id == this.idCiclo) {
        this.item = item;
        break;
      }
    }

    this.subGrupo = 'reuniao';
  }

  ionViewDidLoad() {
  }

  get initialSlide() {
    for (let x in this.item.patrulha) {
      if (this.item.patrulha[x].id == this.idPatrulha) {
        return x;
      }
    }

    return 0;
  }
}
