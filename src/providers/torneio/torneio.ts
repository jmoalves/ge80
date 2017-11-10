import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { Api } from '../../providers/api/api';
import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { Ciclo, PontuacaoPatrulha, PontuacaoDiaria } from '../../models/torneio/ciclo';

const CICLOS_KEY_OLD = 'ciclos';
const CICLOS_VALUE_KEY = 'ciclos-value';
const CICLOS_INDEX_KEY = 'ciclos-index';

@Injectable()
export class TorneioProvider {
  data: Ciclo[];
  index: { [key:string]: number; };
  waitReload:boolean = false;

  promise: Promise<any>;

  constructor(private storage: Storage, private patrulhaProvider: PatrulhaProvider, private api: Api) {
    this.storage.remove(CICLOS_KEY_OLD);
  }

  ciclos(): Promise<Ciclo[]> {
    if (!this.waitReload && this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise<Ciclo[]>((resolve, reject) => {
      this.promise.then(res => {
        resolve(this.data);
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
      })
    })
  }

  ciclo(id: string): Promise<Ciclo> {
    if (!this.waitReload && this.data && this.index) {
      return Promise.resolve(this.data[this.index[id]]);
    }

    return new Promise<Ciclo>((resolve, reject) => {
      this.promise.then(res => {
        resolve(this.data[this.index[id]]);
      }).catch(err => {
        console.log("ERROR: " + JSON.stringify(err));
      })
    })
  }

  reload() {
    this.waitReload = true;
    this.load();
  }

  load() {
    this.storage.get(CICLOS_VALUE_KEY).then((val) => {
      if (!this.data && val) {
        this.data = val;
        console.log("LOADED: ciclos");
        // console.log("LOADED: " + JSON.stringify(this.data));
      }
    });

    this.storage.get(CICLOS_INDEX_KEY).then((val) => {
      if (!this.index && val) {
        this.index = val;
        console.log("LOADED: index");
        // console.log("LOADED: " + JSON.stringify(this.index));
      }
    });

    this.promise = this.api.get('ciclos', { nonce: (new Date()).getTime() }).toPromise();
    this.promise.then(res => {
      // console.log("API GET Ciclos: " + JSON.stringify(res.json()));
      let newData:{ [key:string]: Ciclo } = res.json();

      let ciclos:Ciclo[] = [];
      for (let id in newData) {
        let ciclo:Ciclo = newData[id];
        ciclo.id = id;

        // console.log("Ciclo[" + ciclo.id + "] => " + JSON.stringify(ciclo));
        // console.log("Ciclo[" + ciclo.id + "] atualizadoEm => " + ciclo.atualizadoEm);
        this.ajustaPatrulhas(ciclo);
        ciclos.push(ciclo);
      }

      ciclos.reverse();

      let dict:{ [key:string]: number; } = {};
      let i:number = 0;
      for (let ciclo of ciclos) {
        dict[ciclo.id] = i++;
      }

      this.storage.set(CICLOS_VALUE_KEY, ciclos);
      this.storage.set(CICLOS_INDEX_KEY, dict);

      this.data = ciclos;
      this.index = dict;

      this.waitReload = false;
      this.promise = undefined;

      console.log("URL GOT: ciclos");
      // console.log("API Usando Ciclos: " + JSON.stringify(this.data));
    }).catch((err) => {
      console.log("ERROR: " + JSON.stringify(err));
    });
  }

  private ajustaPatrulhas(ciclo: Ciclo) {
    // this.maxPontos(ciclo);

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

  private complementaPatrulha(id: string, pontuacao: PontuacaoPatrulha) {
    this.patrulhaProvider.patrulha(id).then(patrulha => {
      pontuacao.nome = patrulha.nome;
      pontuacao.avatar = patrulha.avatar;
      pontuacao.cor = patrulha.cor;
    });
  }
}
