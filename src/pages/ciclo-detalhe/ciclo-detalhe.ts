import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { CicloTorneioEficienciaProvider } from '../../providers/ciclo-torneio-eficiencia/ciclo-torneio-eficiencia';

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

  ciclo: string;
  patrulha: Patrulha;
  totalPontos: number;
  maxPontos: number;
  corPatrulha: string;

  pontuacao: PontuacaoPatrulha;

  subGrupo: string = "reuniao";

  totalPontualidade: number = 0;
  totalPresenca: number = 0;
  totalVestuario: number = 0;
  totalParticipacao: number = 0;
  totalEspiritoEscoteiro: number = 0;
  totalJogoTecnico: number = 0;
  totalConquistas: number = 0;
  totalExtras: number = 0;
  totalPenalidade: number = 0;
  totalAtividadeExterna: number = 0;

  totalDiaReuniao: any[] = [];
  totalDiaExtras: any[] = [];

  totalGeralReuniao: number = 0;
  totalGeralExtras: number = 0;

  totalGeralMensal: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public patrulhaProvider: PatrulhaProvider,
    public cicloProvider: CicloTorneioEficienciaProvider) {

    cicloProvider.ciclo(navParams.data.idCiclo).then(ciclo => {
      this.ciclo = ciclo.nome;
    });

    patrulhaProvider.patrulha(navParams.data.idPatrulha).then(patrulha => {
      this.patrulha = patrulha;
    });

    this.torneioItems = navParams.data.items;

    for (let item of this.torneioItems) {
      if (item.id == navParams.data.idCiclo) {
        this.maxPontos = item.maxPontos;

        for (let patrulha of item.patrulha) {
          if (patrulha.id == navParams.data.idPatrulha) {
            this.pontuacao = patrulha.origin;
          }
        }
      }
    }

    console.log("Ciclo: " + navParams.data.idCiclo + " Patrulha: " + navParams.data.idPatrulha + " => " + JSON.stringify(this.pontuacao));

    this.totalPontos = cicloProvider.totalPontos(this.pontuacao);

    for (let dia of this.pontuacao.pontos.porDia) {
      this.totalPontualidade += dia.pontualidade;
      this.totalPresenca += dia.presenca;
      this.totalVestuario += dia.vestuario;
      this.totalParticipacao += dia.participacao;
      this.totalEspiritoEscoteiro += dia.espiritoEscoteiro;
      this.totalJogoTecnico += dia.jogoTecnico;
      this.totalConquistas += dia.conquistas;
      this.totalExtras += dia.extras;
      this.totalPenalidade += dia.penalidade;
      this.totalAtividadeExterna += dia.atividadeExterna;

      this.totalDiaReuniao[dia.id] =
        dia.pontualidade +
        dia.presenca +
        dia.vestuario +
        dia.participacao +
        dia.espiritoEscoteiro +
        dia.jogoTecnico;
      this.totalGeralReuniao += this.totalDiaReuniao[dia.id];

      this.totalDiaExtras[dia.id] =
        dia.conquistas +
        dia.extras -
        dia.penalidade +
        dia.atividadeExterna;
      this.totalGeralExtras += this.totalDiaExtras[dia.id];
    }

    this.totalGeralMensal =
      this.pontuacao.pontos.materialPatrulha +
      this.pontuacao.pontos.cantoPatrulhaVirtual +
      this.pontuacao.pontos.livrosPatrulha;
    }

  ionViewDidLoad() {
  }

}
