import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { CicloTorneioEficienciaProvider } from '../../providers/ciclo-torneio-eficiencia/ciclo-torneio-eficiencia';

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
  ciclo: string;
  patrulha: string;
  totalPontos: number;

  pontuacao: PontuacaoPatrulha;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public patrulhaProvider: PatrulhaProvider,
      public cicloProvider: CicloTorneioEficienciaProvider) {

    let ciclo = cicloProvider.ciclo(navParams.data.ciclo.idCiclo);
    this.ciclo = ciclo.nome;

    // console.log(JSON.stringify(navParams.data.patrulha));
    this.patrulha = navParams.data.patrulha.idPatrulha;
    this.pontuacao = navParams.data.patrulha;
    this.totalPontos = cicloProvider.totalPontos(this.pontuacao);
  }

  ionViewDidLoad() {
  }
}
