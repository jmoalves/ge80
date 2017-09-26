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

  pontuacaoCiclo(id: string): Promise<CicloTorneioPontuacao> {
    return new Promise<CicloTorneioPontuacao>((resolve, reject) => {
      this.promise = this.api.get('ciclos/' + id + '.json').toPromise().then(res => {
        var json = res.json();

        // console.log("API GET " + id + " => " + JSON.stringify(json));

        json.maxPontos = undefined; // Importante! Adiciona o atributo.
        json.maxPontos = this.maxPontos(json);

        for (let x in json.patrulha) {
          json.patrulha[x].totalPontos = undefined; // Importante! Adiciona o atributo.
          json.patrulha[x].totalPontos = this.totalPontos(json.patrulha[x]);
        }

        // console.log("Ciclo " + id + " => " + JSON.stringify(json));
        resolve(json);
      });
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

  maxPontos(pontuacao: CicloTorneioPontuacao): number {
    let maxPontos = 0;

    maxPontos += 50; //cantoPatrulhaVirtual
    maxPontos += 50; //livrosPatrulha
    maxPontos += 50; //materialPatrulha

    // Assume a consistência, ou seja, todas as patrulhas
    // tem o mesmo número de dias
    let dias = pontuacao.patrulha[0].pontos.porDia.length;

    maxPontos += (dias * 10); //pontualidade
    maxPontos += (dias * 10); //presenca
    maxPontos += (dias * 10); //vestuario
    maxPontos += (dias * 10); //participacao
    maxPontos += (dias * 10); //espiritoEscoteiro
    maxPontos += (dias * 10); //jogoTecnico
    maxPontos += (dias * 10); //conquistas
    maxPontos += (dias * 10); //extras
    maxPontos += (dias * 10); //penalidade
    maxPontos += (dias * 10); //atividadeExterna

    return maxPontos;
  }
}
