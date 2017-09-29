/*
 * Ciclo
 *
 * Representa a pontuação de um ciclo do Torneio de Eficiência
 */

export class Ciclo {
  nome: string;
  maxPontos?: number;
  atualizadoEm?: number;

  patrulha: {
    [key: string]: PontuacaoPatrulha
  }
}

export class PontuacaoPatrulha {
  nome?: string;
  avatar?: string;
  cor?: string;
  pontos: {
    materialPatrulha: number;
    cantoPatrulhaVirtual: number;
    livrosPatrulha: number;

    dia: {
      [key: string]: {
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
      }
    }
  };
  totais?: {
    geral: number;

    totalPontualidade: number;
    totalPresenca: number;
    totalVestuario: number;
    totalParticipacao: number;
    totalEspiritoEscoteiro: number;
    totalJogoTecnico: number;
    totalDiaReuniao: {
      [key: string]: number;
    };
    totalGeralReuniao: number;

    totalConquistas: number;
    totalExtras: number;
    totalPenalidade: number;
    totalAtividadeExterna: number;
    totalDiaExtras: {
      [key: string]: number;
    };
    totalGeralExtras: number;

    totalGeralMensal: number;
  }
}
