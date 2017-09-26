import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { CicloTorneioEficienciaProvider } from '../../providers/ciclo-torneio-eficiencia/ciclo-torneio-eficiencia';

@Injectable()
export class TorneioProvider {
  constructor(public http: Http,
    public patrulhaProvider: PatrulhaProvider,
    public cicloProvider: CicloTorneioEficienciaProvider) {
  }

  torneioItems(): Promise<any[]> {
    var provider = this;
    return new Promise(function(resolve, reject) {
      provider.cicloProvider.ciclos().then(function(ciclos) {
        let torneioItems = [];
        for (let ciclo of ciclos) {
          provider.cicloProvider.pontuacaoCiclo(ciclo.id).then(function(pontuacao) {
            let item = {
              id: ciclo.id,
              nome: ciclo.nome,
              maxPontos: pontuacao.maxPontos,
              patrulha: [],

              origin: pontuacao
            }

            for (let pontuacaoPatrulha of pontuacao.patrulha) {
              provider.patrulhaProvider.patrulha(pontuacaoPatrulha.idPatrulha).then(function(patrulha) {
                let pontos = {
                  id: patrulha.id,
                  nome: patrulha.nome,
                  avatar: patrulha.avatar,
                  pontos: pontuacaoPatrulha.totalPontos,
                  cor: patrulha.cor,

                  origin: pontuacaoPatrulha,

                  totalPontualidade: 0,
                  totalPresenca: 0,
                  totalVestuario: 0,
                  totalParticipacao: 0,
                  totalEspiritoEscoteiro: 0,
                  totalJogoTecnico: 0,
                  totalDiaReuniao: [],
                  totalGeralReuniao: 0,

                  totalConquistas: 0,
                  totalExtras: 0,
                  totalPenalidade: 0,
                  totalAtividadeExterna: 0,
                  totalDiaExtras: [],
                  totalGeralExtras: 0,

                  totalGeralMensal: 0
                }

                for (let dia of pontuacaoPatrulha.pontos.porDia) {
                  pontos.totalPontualidade += dia.pontualidade;
                  pontos.totalPresenca += dia.presenca;
                  pontos.totalVestuario += dia.vestuario;
                  pontos.totalParticipacao += dia.participacao;
                  pontos.totalEspiritoEscoteiro += dia.espiritoEscoteiro;
                  pontos.totalJogoTecnico += dia.jogoTecnico;
                  pontos.totalConquistas += dia.conquistas;
                  pontos.totalExtras += dia.extras;
                  pontos.totalPenalidade += dia.penalidade;
                  pontos.totalAtividadeExterna += dia.atividadeExterna;

                  pontos.totalDiaReuniao[dia.id] =
                    dia.pontualidade +
                    dia.presenca +
                    dia.vestuario +
                    dia.participacao +
                    dia.espiritoEscoteiro +
                    dia.jogoTecnico;
                  pontos.totalGeralReuniao += pontos.totalDiaReuniao[dia.id];

                  pontos.totalDiaExtras[dia.id] =
                    dia.conquistas +
                    dia.extras -
                    dia.penalidade +
                    dia.atividadeExterna;
                  pontos.totalGeralExtras += pontos.totalDiaExtras[dia.id];
                }

                pontos.totalGeralMensal =
                  pontuacaoPatrulha.pontos.materialPatrulha +
                  pontuacaoPatrulha.pontos.cantoPatrulhaVirtual +
                  pontuacaoPatrulha.pontos.livrosPatrulha;

                item.patrulha.push(pontos);
              })
            }

            // console.log("Item: " + JSON.stringify(item));
            torneioItems.push(item);
          })
        }

        resolve(torneioItems);
      })
    });
  }
}
