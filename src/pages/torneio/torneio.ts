import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { CicloTorneioEficienciaProvider } from '../../providers/ciclo-torneio-eficiencia/ciclo-torneio-eficiencia';

@IonicPage()
@Component({
  selector: 'page-torneio',
  templateUrl: 'torneio.html'
})

export class TorneioPage {
  maxPontos: number;

  torneioItems: any[];

  constructor(
          public navCtrl: NavController,
          public patrulhaProvider: PatrulhaProvider,
          public cicloProvider: CicloTorneioEficienciaProvider) {
    this.cicloProvider.ciclos().then(ciclos => {
      this.torneioItems = [];
      for (let ciclo of ciclos) {
        this.cicloProvider.pontuacaoCiclo(ciclo.id).then(pontuacao => {
          // console.log("Pontuacao: " + JSON.stringify(pontuacao));

          let item = {
            id: ciclo.nome,
            maxPontos: pontuacao.maxPontos,
            patrulha: [],

            origin: pontuacao
          }

          for (let pontuacaoPatrulha of pontuacao.patrulha) {
            patrulhaProvider.patrulha(pontuacaoPatrulha.idPatrulha).then(patrulha => {
              item.patrulha.push({
                id: patrulha.id,
                nome: patrulha.nome,
                avatar: patrulha.avatar,
                pontos: cicloProvider.totalPontos(pontuacaoPatrulha),
                cor: patrulha.cor,

                origin: pontuacaoPatrulha
              })
            })
          }

          // console.log("Item: " + JSON.stringify(item));
          this.torneioItems.push(item);
        })
      }
    })
  }

  ionViewDidLoad() {
  }

  barClicked(evt, cicloPontuacao, patrulhaPontuacao) {
    // console.log("Agora vai! + " + JSON.stringify(evt));
    this.navCtrl.push('CicloDetalhePage', { ciclo: cicloPontuacao, patrulha: patrulhaPontuacao });
  }
}
