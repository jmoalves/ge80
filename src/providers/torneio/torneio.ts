import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { Api } from '../../providers/api/api';
import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { Ciclo, PontuacaoPatrulha } from '../../models/torneio/ciclo';

const CICLOS_KEY = 'ciclos';

@Injectable()
export class TorneioProvider {
  data: { [key: string]: Ciclo };
  promise: Promise<any>;

  constructor(private storage: Storage, private patrulhaProvider: PatrulhaProvider, private api: Api) {
  }

  ciclos(): Promise<{ [key: string]: Ciclo }> {
    if (!this.promise && this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise<{ [key: string]: Ciclo }>((resolve, reject) => {
      this.promise.then(res => {
        resolve(this.data)
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
        this.storage.get(CICLOS_KEY).then((val) => {
          this.data = val;
          console.log("LOADED: " + JSON.stringify(this.data));
          resolve(this.data);
        });
      })
    })
  }


  ciclo(id: string): Promise<Ciclo> {
    if (!this.promise && this.data) {
      return Promise.resolve(this.data[id]);
    }

    return new Promise<Ciclo>((resolve, reject) => {
      this.promise.then(res => {
        resolve(this.data[id]);
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
        this.storage.get(CICLOS_KEY).then((val) => {
          this.data = val;
          console.log("LOADED: " + JSON.stringify(this.data));
          resolve(this.data[id]);
        });
      })
    })
  }

  init() {
    this.promise = this.api.get('api/ciclos.json').toPromise();
    this.promise.then(res => {
      // console.log("API GET Ciclos: " + JSON.stringify(res.json()));

      this.data = res.json();
      for (let ciclo in this.data) {
        // console.log("Ciclo[" + ciclo + "] => " + JSON.stringify(this.data[ciclo]));
        console.log("Ciclo[" + ciclo + "] atualizadoEm => " + this.data[ciclo].atualizadoEm);
        this.computaTotais(this.data[ciclo]);
      }

      this.storage.set(CICLOS_KEY, this.data);
      this.promise = undefined;
      // console.log("API Usando Ciclos: " + JSON.stringify(this.data));
    }).catch((err) => {
      console.log("ERROR: " + JSON.stringify(err));
    });
  }

  private computaTotais(ciclo: Ciclo) {
    // this.maxPontos(ciclo);

    let maxPontos:number = 0;

    for (let patrulha in ciclo.patrulha) {
      this.computaPontosPatrulha(ciclo.patrulha[patrulha]);
      this.complementaPatrulha(patrulha, ciclo.patrulha[patrulha]);
      ciclo.patrulha[patrulha].topo = false;

      if (ciclo.patrulha[patrulha].totais.geral > maxPontos) {
        maxPontos = ciclo.patrulha[patrulha].totais.geral;
      }
    }

    // Para tratar os empates
    for (let patrulha in ciclo.patrulha) {
      if (ciclo.patrulha[patrulha].totais.geral == maxPontos) {
        ciclo.patrulha[patrulha].topo = true;
      }
    }

    // Só para ter uma margem na barra
    ciclo.maxPontos = Math.round(maxPontos * 1.1);
  }

  private maxPontos(ciclo: Ciclo) {
    ciclo.maxPontos = 0;

    ciclo.maxPontos += 50; //cantoPatrulhaVirtual
    ciclo.maxPontos += 50; //livrosPatrulha
    ciclo.maxPontos += 50; //materialPatrulha

    // Assume a consistência, ou seja, todas as patrulhas
    // tem o mesmo número de dias
    for (let x in ciclo.patrulha) {
      for (let y in ciclo.patrulha[x].pontos.dia) {
        ciclo.maxPontos += 10; //pontualidade
        ciclo.maxPontos += 10; //presenca
        ciclo.maxPontos += 10; //vestuario
        ciclo.maxPontos += 10; //participacao
        ciclo.maxPontos += 10; //espiritoEscoteiro
        ciclo.maxPontos += 10; //jogoTecnico
        ciclo.maxPontos += 10; //conquistas
        ciclo.maxPontos += 10; //extras
        ciclo.maxPontos += 0; //penalidade
        ciclo.maxPontos += 10; //atividadeExterna
      }
      // Feio! Mas é para uma iteração só mesmo
      return;
    }
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

    for (let dia in patrulha.pontos.dia) {
      // Totais de pontos normais de reunião
      patrulha.totais.totalPontualidade += patrulha.pontos.dia[dia].pontualidade;
      patrulha.totais.totalPresenca += patrulha.pontos.dia[dia].presenca;
      patrulha.totais.totalVestuario += patrulha.pontos.dia[dia].vestuario;
      patrulha.totais.totalParticipacao += patrulha.pontos.dia[dia].participacao;
      patrulha.totais.totalEspiritoEscoteiro += patrulha.pontos.dia[dia].espiritoEscoteiro;
      patrulha.totais.totalJogoTecnico += patrulha.pontos.dia[dia].jogoTecnico;

      patrulha.totais.totalDiaReuniao[dia] =
        patrulha.pontos.dia[dia].pontualidade +
        patrulha.pontos.dia[dia].presenca +
        patrulha.pontos.dia[dia].vestuario +
        patrulha.pontos.dia[dia].participacao +
        patrulha.pontos.dia[dia].espiritoEscoteiro +
        patrulha.pontos.dia[dia].jogoTecnico;
      patrulha.totais.totalGeralReuniao += patrulha.totais.totalDiaReuniao[dia];

      // Ajusta penalidade (ela é negativa!)
      if (patrulha.pontos.dia[dia].penalidade > 0) {
        patrulha.pontos.dia[dia].penalidade *= -1;
      }

      // Totais de categorias extras
      patrulha.totais.totalConquistas += patrulha.pontos.dia[dia].conquistas;
      patrulha.totais.totalExtras += patrulha.pontos.dia[dia].extras;
      patrulha.totais.totalPenalidade += patrulha.pontos.dia[dia].penalidade;
      patrulha.totais.totalAtividadeExterna += patrulha.pontos.dia[dia].atividadeExterna;

      patrulha.totais.totalDiaExtras[dia] =
        patrulha.pontos.dia[dia].conquistas +
        patrulha.pontos.dia[dia].extras +
        patrulha.pontos.dia[dia].penalidade +
        patrulha.pontos.dia[dia].atividadeExterna;
      patrulha.totais.totalGeralExtras += patrulha.totais.totalDiaExtras[dia];
    }

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

  private complementaPatrulha(id: string, pontuacao: PontuacaoPatrulha) {
    this.patrulhaProvider.patrulha(id).then(patrulha => {
      pontuacao.nome = patrulha.nome;
      pontuacao.avatar = patrulha.avatar;
      pontuacao.cor = patrulha.cor;
    });
  }
}
