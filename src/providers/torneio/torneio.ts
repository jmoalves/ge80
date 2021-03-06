import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Api } from '../../providers/api/api';
import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { Ciclo, PontuacaoPatrulha, PontuacaoDiaria } from '../../models/torneio/ciclo';

@Injectable()
export class TorneioProvider {
  private _anos = null;
  private _index: { [key:string]: any; };
  private _waitReload:boolean = false;

  private _promise: Promise<any>;

  constructor(
      private patrulhaProvider: PatrulhaProvider,
      private api: Api) {
  }

  anos(): Promise<string[]> {
    if (!this._waitReload && this._anos) {
      return Promise.resolve(this._anos);
    }

    return new Promise<string[]>((resolve, reject) => {
      this._promise.then(res => {
        resolve(this._anos);
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
        reject(err);
      })
    })
  }

  ciclos(ano:string): Promise<Ciclo[]> {
    console.log("CICLOS: " + ano);
    if (!this._waitReload && this._anos) {
      return Promise.resolve(this._anos[ano].ciclos);
    }

    return new Promise<Ciclo[]>((resolve, reject) => {
      this._promise.then(res => {
        resolve(this._anos[ano].ciclos);
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
        reject(err);
      })
    })
  }

  ciclo(id: string): Promise<Ciclo> {
    if (!this._waitReload && this._anos && this._index) {
      return Promise.resolve(this._anos[this._index[id].ano].ciclos[this._index[id].idx]);
    }

    return new Promise<Ciclo>((resolve, reject) => {
      this._promise.then(res => {
        resolve(this._anos[this._index[id].ano].ciclos[this._index[id].idx]);
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
        reject(err);
      })
    })
  }

  reload() {
    this._waitReload = true;
    this.load();
  }

  load() {
    this._promise = this.api.get('ciclos', { nonce: (new Date()).getTime() }).toPromise();
    this._promise.then(res => {
      // console.log("API GET Ciclos: " + JSON.stringify(res.json()));
      let newData:{ [key:string]: Ciclo } = res.json();

      let anos = {};
      // let ciclos:Ciclo[] = [];
      for (let id in newData) {
        let ciclo:Ciclo = newData[id];
        ciclo.id = id;
        ciclo.ano = id.substr(0, 4);

        // console.log("Ciclo[" + ciclo.id + "] => " + JSON.stringify(ciclo));
        // console.log("Ciclo[" + ciclo.id + "] atualizadoEm => " + ciclo.atualizadoEm);
        this.ajustaPatrulhas(ciclo);

        if (!anos[ciclo.ano]) {
          anos[ciclo.ano] = {
            ciclos: []
          }
        }
        anos[ciclo.ano].ciclos.push(ciclo);
      }

      let dict:{ [key:string]: any; } = {};
      for (let ano in anos) {
        anos[ano].ciclos.reverse();
        anos[ano].maxPontos = 0;

        let patrulhas = {};
        let i:number = 0;
        for (let ciclo of anos[ano].ciclos) {
          for (let patrulha of ciclo.patrulhaArray) {
            console.log("Patrulha! " + JSON.stringify(patrulha));
            if (!patrulhas[patrulha.id]) {
              patrulhas[patrulha.id] = {
                id : patrulha.id,
                topo : false,
                totalGeral : 0
              };
            }

            patrulhas[patrulha.id].totalGeral += patrulha.totais.geral;
            this.complementaPatrulha(patrulha.id, patrulhas[patrulha.id]);
          }

          dict[ciclo.id] = {
            "ano": ano,
            idx: i++
          }

          anos[ano].maxPontos += ciclo.maxPontos;
        }

        anos[ano].patrulhas = [];
        for (let id in patrulhas) {
          anos[ano].patrulhas.push(patrulhas[id]);
        }
        anos[ano].patrulhas.sort((a, b) => {
          // Em ordem descendente de pontos
          return (b.totalGeral - a.totalGeral);
        })

        let maior = undefined;
        for (let patrulha of anos[ano].patrulhas) {
          if (!maior) {
            maior = patrulha.totalGeral;
          }

          if (patrulha.totalGeral < maior) {
            break;
          }

          patrulha.topo = true;
        }
      }

      this._anos = anos;
      this._index = dict;

      this._waitReload = false;
      this._promise = undefined;

      console.log("URL GOT: ciclos");
      console.log("API Usando Ciclos: " + JSON.stringify(this._anos));
    }).catch((err) => {
      console.log("ERROR: " + JSON.stringify(err));
    });
  }

  private ajustaPatrulhas(ciclo: Ciclo) {
    let maxPontos:number = 0;
    let patrulhas:PontuacaoPatrulha[] = [];

    for (let id in ciclo.patrulha) {
      let patrulha:PontuacaoPatrulha = ciclo.patrulha[id];
      patrulha.id = id;

      this.computaPontosPatrulha(patrulha);
      this.complementaPatrulha(id, patrulha);
      patrulha.topo = false;

      if (patrulha.totais.geral > maxPontos) {
        maxPontos = patrulha.totais.geral;
      }

      patrulhas.push(patrulha);
    }

    // Ordena por pontuacao
    patrulhas.sort((a, b) => {
      // Em ordem descendente de pontos
      return (b.totais.geral - a.totais.geral);
    })

    ciclo.patrulhaArray = patrulhas;

    // Para tratar os empates
    for (let patrulha of ciclo.patrulhaArray) {
      if (patrulha.totais.geral == maxPontos) {
        patrulha.topo = true;
      }
    }

    // Só para ter uma margem na barra
    // ciclo.maxPontos = Math.round(maxPontos * 1.1);
    ciclo.maxPontos = maxPontos;
  }

  private computaPontosPatrulha(patrulha: PontuacaoPatrulha) {
    patrulha.totais = {
      geral: 0,

      totalPontualidade: 0,
      totalPresenca: 0,
      totalVestuario: 0,
      totalParticipacao: 0,
      totalEspiritoEscoteiro: 0,
      totalJogoTecnico: 0,
      totalGeralReuniao: 0,
      totalDiaReuniao: {},

      totalConquistas: 0,
      totalExtras: 0,
      totalPenalidade: 0,
      totalAtividadeExterna: 0,
      totalGeralExtras: 0,
      totalDiaExtras: {},

      totalGeralMensal: 0
    }

    let dias:PontuacaoDiaria[] = [];
    for (let id in patrulha.pontos.dia) {
      let dia:PontuacaoDiaria = patrulha.pontos.dia[id];
      dia.id = id;

      // Totais de pontos normais de reunião
      patrulha.totais.totalPontualidade += dia.pontualidade;
      patrulha.totais.totalPresenca += dia.presenca;
      patrulha.totais.totalVestuario += dia.vestuario;
      patrulha.totais.totalParticipacao += dia.participacao;
      patrulha.totais.totalEspiritoEscoteiro += dia.espiritoEscoteiro;
      patrulha.totais.totalJogoTecnico += dia.jogoTecnico;

      patrulha.totais.totalDiaReuniao[id] =
        dia.pontualidade +
        dia.presenca +
        dia.vestuario +
        dia.participacao +
        dia.espiritoEscoteiro +
        dia.jogoTecnico;
      patrulha.totais.totalGeralReuniao += patrulha.totais.totalDiaReuniao[id];

      // Ajusta penalidade (ela é negativa!)
      if (dia.penalidade > 0) {
        dia.penalidade *= -1;
      }

      // Totais de categorias extras
      patrulha.totais.totalConquistas += dia.conquistas;
      patrulha.totais.totalExtras += dia.extras;
      patrulha.totais.totalPenalidade += dia.penalidade;
      patrulha.totais.totalAtividadeExterna += dia.atividadeExterna;

      patrulha.totais.totalDiaExtras[id] =
        dia.conquistas +
        dia.extras +
        dia.penalidade +
        dia.atividadeExterna;
      patrulha.totais.totalGeralExtras += patrulha.totais.totalDiaExtras[id];

      dias.push(dia);
    }
    dias.sort((a,b) => {
      if (a.id < b.id)  {
        return -1;
      }

      if (a.id > b.id) {
        return 1;
      }

      return 0;
    })
    patrulha.pontos.diasArray = dias;

    // Pontos mensais
    patrulha.totais.totalGeralMensal =
      patrulha.pontos.materialPatrulha +
      patrulha.pontos.cantoPatrulhaVirtual +
      patrulha.pontos.livrosPatrulha;

    // Total Geral
    patrulha.totais.geral =
      patrulha.totais.totalGeralReuniao +
      patrulha.totais.totalGeralExtras +
      patrulha.totais.totalGeralMensal;
  }

  private complementaPatrulha(id: string, item: any) {
    this.patrulhaProvider.patrulha(id).then(patrulha => {
      item.nome = patrulha.nome;
      item.avatar = patrulha.avatar;
      item.cor = patrulha.cor;
    });
  }
}
