import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from '../api/api';

import { CicloTorneio } from '../../models/cicloTorneio';
import { CicloTorneioPontuacao, PontuacaoPatrulha } from '../../models/cicloTorneioPontuacao';

import { PatrulhaProvider } from '../patrulha/patrulha';

const maxCiclos: number = 12;

@Injectable()
export class CicloTorneioEficienciaProvider {

  promise: Promise<any>;

  data: CicloTorneio[];

  constructor(public http: Http, public patrulhaProvider: PatrulhaProvider, public api: Api) {
    this.loadCiclos();
  }

  loadCiclos() {
    this.promise = this.api.get('ciclos/ciclos.json').toPromise();
    this.promise.then(res => {
      // console.log("API GET Ciclos: " + JSON.stringify(res.json()));

      this.data = [];
      for (let ciclo of res.json()) {
        this.data.push({
          id: ciclo.id,
          nome: ciclo.nome
        })

        if (this.data.length >= maxCiclos) {
          break;
        }
      }

      // console.log("API Usando Ciclos: " + JSON.stringify(this.data));
      this.promise = undefined;
    });
  }

  ciclos(): Promise<CicloTorneio[]> {
    if (!this.promise && this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise<CicloTorneio[]>((resolve, reject) => {
      this.promise.then(res => {
        resolve(this.data);
      });
    })

  }

  ciclo(id: string): Promise<CicloTorneio> {
    return new Promise<CicloTorneio>((resolve, reject) => {
      this.ciclos().then(ciclos => {
        for (let ciclo of ciclos) {
          if (ciclo.id == id) {
            return resolve(ciclo);
          }
        }

        return resolve(null);
      })
    })
  }

  pontuacaoCiclo(idCiclo: string): Promise<CicloTorneioPontuacao> {
    return new Promise<CicloTorneioPontuacao>((resolve, reject) => {
      this.patrulhaProvider.patrulhas().then(patrulhas => {
        let max = this.maxPontos();

        let pontuacao = {
          "idCiclo": idCiclo,
          maxPontos: 600,
          patrulha: []
        };

        for (let patrulha of patrulhas) {
          pontuacao.patrulha.push({
            idPatrulha: patrulha.id,

            pontos: {
              cantoPatrulhaVirtual: Math.round(Math.random() * max.patrulha[0].pontos.cantoPatrulhaVirtual),
              livrosPatrulha: Math.round(Math.random() * max.patrulha[0].pontos.livrosPatrulha),
              materialPatrulha: Math.round(Math.random() * max.patrulha[0].pontos.materialPatrulha),

              porDia: [{
                id: "02",
                pontualidade: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].pontualidade),
                presenca: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].presenca),
                vestuario: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].vestuario),
                participacao: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].participacao),
                espiritoEscoteiro: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].espiritoEscoteiro),
                jogoTecnico: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].jogoTecnico),
                conquistas: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].conquistas),
                extras: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].extras),
                penalidade: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].penalidade),
                atividadeExterna: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].atividadeExterna)
              }, {
                id: "09",
                pontualidade: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].pontualidade),
                presenca: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].presenca),
                vestuario: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].vestuario),
                participacao: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].participacao),
                espiritoEscoteiro: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].espiritoEscoteiro),
                jogoTecnico: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].jogoTecnico),
                conquistas: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].conquistas),
                extras: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].extras),
                penalidade: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].penalidade),
                atividadeExterna: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].atividadeExterna)
              }, {
                id: "16",
                pontualidade: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].pontualidade),
                presenca: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].presenca),
                vestuario: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].vestuario),
                participacao: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].participacao),
                espiritoEscoteiro: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].espiritoEscoteiro),
                jogoTecnico: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].jogoTecnico),
                conquistas: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].conquistas),
                extras: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].extras),
                penalidade: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].penalidade),
                atividadeExterna: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].atividadeExterna)
              }, {
                id: "23",
                pontualidade: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].pontualidade),
                presenca: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].presenca),
                vestuario: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].vestuario),
                participacao: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].participacao),
                espiritoEscoteiro: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].espiritoEscoteiro),
                jogoTecnico: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].jogoTecnico),
                conquistas: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].conquistas),
                extras: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].extras),
                penalidade: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].penalidade),
                atividadeExterna: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].atividadeExterna)
              }, {
                id: "30",
                pontualidade: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].pontualidade),
                presenca: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].presenca),
                vestuario: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].vestuario),
                participacao: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].participacao),
                espiritoEscoteiro: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].espiritoEscoteiro),
                jogoTecnico: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].jogoTecnico),
                conquistas: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].conquistas),
                extras: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].extras),
                penalidade: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].penalidade),
                atividadeExterna: Math.round(Math.random() * max.patrulha[0].pontos.porDia[0].atividadeExterna)
              }]
            }
          })
        }

        resolve(pontuacao);
      })
    });
  }


  totalPontos(pontuacao: PontuacaoPatrulha): number {
    let pontosPatrulha = 0;
    for (let dia of pontuacao.pontos.porDia) {
      pontosPatrulha += dia.pontualidade;
      pontosPatrulha += dia.presenca;
      pontosPatrulha += dia.vestuario;
      pontosPatrulha += dia.participacao;
      pontosPatrulha += dia.espiritoEscoteiro;
      pontosPatrulha += dia.jogoTecnico;
      pontosPatrulha += dia.conquistas;
      pontosPatrulha += dia.extras;
      pontosPatrulha -= dia.penalidade;
      pontosPatrulha += dia.atividadeExterna;
    }
    pontosPatrulha += pontuacao.pontos.cantoPatrulhaVirtual;
    pontosPatrulha += pontuacao.pontos.livrosPatrulha;
    pontosPatrulha += pontuacao.pontos.materialPatrulha;

    return pontosPatrulha;
  }

  maxPontos(): CicloTorneioPontuacao {
    return {
      "idCiclo": "Max",

      maxPontos: 250,

      patrulha: [{
        idPatrulha: "Max",
        pontos: {
          cantoPatrulhaVirtual: 50,
          livrosPatrulha: 50,
          materialPatrulha: 50,

          porDia: [{
            id: "DIA",
            pontualidade: 10,
            presenca: 10,
            vestuario: 10,
            participacao: 10,
            espiritoEscoteiro: 10,
            jogoTecnico: 10,
            conquistas: 10,
            extras: 10,
            penalidade: 10,
            atividadeExterna: 10
          }]
        }
      }]
    }
  }
}
