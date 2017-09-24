/*
 * CicloTorneio
 *
 * Representa a pontuação de um ciclo do Torneio de Eficiência
 */

export class PontuacaoPatrulha {
  idPatrulha: string;

  pontos: {
    materialPatrulha: number;
    cantoPatrulhaVirtual: number;
    livrosPatrulha: number;

    porDia: [{
      id: string;

      pontualidade: number;
      presenca: number;
      vestuario: number;
      participacao: number;
      espiritoEscoteiro: number;
      jogoTecnico: number;
      conquistas: number;
      extras: number;
      penalidade: number;
      atividadeExterna: number;
    }]
  }
}
export class CicloTorneioPontuacao {
  idCiclo: string;

  maxPontos: number;

  patrulha: PontuacaoPatrulha[];
}
