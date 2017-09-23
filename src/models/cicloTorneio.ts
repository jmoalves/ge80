/*
 * CicloTorneio
 *
 * Representa a pontuação de um ciclo do Torneio de Eficiência
 */

 export class CicloTorneio {
   idCiclo: string;

   pontos: {
    materialPatrulha: number;
    cantoPatrulhaVirtual: number;
    livrosPatrulha: number;

    porDia: [{
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
