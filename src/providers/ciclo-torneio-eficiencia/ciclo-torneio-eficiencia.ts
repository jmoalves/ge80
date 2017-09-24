import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { CicloTorneio } from '../../models/cicloTorneio';
import { CicloTorneioPontuacao } from '../../models/cicloTorneioPontuacao';

import { PatrulhaProvider } from '../patrulha/patrulha';

@Injectable()
export class CicloTorneioEficienciaProvider {

  constructor(public http: Http, public patrulhaProvider: PatrulhaProvider) {
    console.log('Hello CicloTorneioEficienciaProvider Provider');
  }

  ciclos(): CicloTorneio[] {
    return [{
      id: "2017-09",
      nome: "Setembro 2017"
    }, {
      id: "2017-08",
      nome: "Agosto 2017"
    }, {
      id: "2017-07",
      nome: "Julho 2017"
    }, {
      id: "2017-06",
      nome: "Junho 2017"
    }, {
      id: "2017-05",
      nome: "Maio 2017"
    }, {
      id: "2017-04",
      nome: "Abril 2017"
    }, {
      id: "2017-03",
      nome: "Março 2017"
    }, {
      id: "2017-02",
      nome: "Fevereiro 2017"
    }, {
      id: "2017-01",
      nome: "Janeiro 2017"
    }, {
      id: "2016-12",
      nome: "Dezembro 2016"
    }, {
      id: "2016-11",
      nome: "Novembro 2016"
    }, {
      id: "2016-10",
      nome: "Outubro 2016"
    }]
  }

  pontuacaoCiclo(idCiclo: string): CicloTorneioPontuacao {
    let max = this.maxPontos();

    let pontuacao = {
      "idCiclo": idCiclo,
      maxPontos: 550,
      patrulha: []
    };

    for (let patrulha of this.patrulhaProvider.patrulhas()) {
      pontuacao.patrulha.push({
        idPatrulha: patrulha.id,

        pontos: {
          cantoPatrulhaVirtual: Math.round(Math.random() * max.patrulha[0].pontos.cantoPatrulhaVirtual),
          livrosPatrulha: Math.round(Math.random() * max.patrulha[0].pontos.livrosPatrulha),
          materialPatrulha: Math.round(Math.random() * max.patrulha[0].pontos.materialPatrulha),

          porDia: [{
            id: "D1",
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
            id: "D2",
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
            id: "D3",
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
            id: "D4",
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

    return pontuacao;
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
