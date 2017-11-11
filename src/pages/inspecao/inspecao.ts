import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JovensProvider }  from '../../providers/jovens/jovens';
import { PatrulhaProvider }  from '../../providers/patrulha/patrulha';

import { Jovem }  from '../../models/jovem';
import { Patrulha }  from '../../models/patrulha';

@IonicPage()
@Component({
  selector: 'page-inspecao',
  templateUrl: 'inspecao.html',
})
export class InspecaoPage {
  inspecao = [];

  private patrulhas: Patrulha[] = [];
  private jovens: Jovem[] = [];

  constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        jovensPrv: JovensProvider,
        patrulhasPrv: PatrulhaProvider) {
    Promise.all([
      jovensPrv.jovens(),
      patrulhasPrv.patrulhas()])
    .then(([jovens, patrulhas]) => {
      this.jovens = jovens;
      this.patrulhas = patrulhas;

      this.ajustarInspecao();
    });
  }

  ionViewDidLoad() {
  }

  ajustarInspecao() {
    let patrulhas = [];

    for (let jovem of this.jovens) {
      let patrulha = patrulhas[jovem.patrulha];
      if (!patrulha) {
        patrulha = {
          id: jovem.patrulha,
          nome: this.patrulhas[jovem.patrulha].nome,
          jovens: []
        }
      }

      patrulha.jovens.push({
        nome: jovem.nome
      })
    }

    let inspecao = [];
    for (let key in patrulhas) {
      inspecao.push(patrulhas[key]);
    }

    this.inspecao = inspecao;
  }
}
