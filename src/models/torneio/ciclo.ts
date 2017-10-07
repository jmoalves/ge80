/*
 * Ciclo
 *
 * Representa a pontuação de um ciclo do Torneio de Eficiência
 */

export class Ciclo {
  id?: string;
  nome: string;
  maxPontos?: number;
  atualizadoEm?: number;

  patrulha: {
    [key: string]: PontuacaoPatrulha;
  }
  patrulhaArray?: PontuacaoPatrulha[];
}

export class PontuacaoPatrulha {
  id?: string;
  nome?: string;
  avatar?: string;
  cor?: string;
  topo?: boolean;
  pontos: {
    materialPatrulha: number;
    cantoPatrulhaVirtual: number;
    livrosPatrulha: number;

    dia: { [key: string]: PontuacaoDiaria; }
    diasArray: PontuacaoDiaria[];
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

export class PontuacaoDiaria {
  id?: string;
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
