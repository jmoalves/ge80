import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController } from 'ionic-angular';

import { Ciclo, PontuacaoPatrulha } from '../../models/torneio/ciclo';

import { TorneioProvider } from '../../providers/torneio/torneio';
import { PatrulhaProvider } from '../../providers/patrulha/patrulha';

@IonicPage()
@Component({
  selector: 'page-ciclo-detalhe',
  templateUrl: 'ciclo-detalhe.html',
})
export class CicloDetalhePage {
  @ViewChild('slides') slides: Slides;

  ciclo: Ciclo;
  slideInicial: number;
  subGrupo: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private torneioProvider: TorneioProvider, private patrulaProvider: PatrulhaProvider) {

    this.ciclo = navParams.data.ciclo;
    // console.log("Ciclo[" + this.ciclo.id + "] tem " + this.ciclo.patrulhaArray.length + " patrulhas");
    for (let i in this.ciclo.patrulhaArray) {
      // console.log("Patrulha: " + i);
      let patrulha: PontuacaoPatrulha = this.ciclo.patrulhaArray[i];
      if (patrulha.id == navParams.data.idPatrulha) {
        this.slideInicial = Number(i);
        break;
      }
    }

    this.subGrupo = 'reuniao';
  }

  ionViewDidLoad() {
  }

  refresh(evt) {
    console.log("REFRESH - Begin", evt);
    this.patrulaProvider.load();
    this.torneioProvider.reload();

    this.torneioProvider.ciclo(this.ciclo.id).then((ciclo) => {
      this.ciclo = ciclo;
      console.log("REFRESH - END");
      this.slides.update();
    });
  }

  setGrupo(grupo: string) {
    this.subGrupo = grupo;
  }

  help(evt) {
    this.navCtrl.push('HelpPage');
  }

  helpItem(evt, item: string) {
    // console.log("HELP: " + item);

    let msg: string;

    switch (item) {
      case 'pontualidade':
        msg = "[Pontualidade] Começa com 10 pontos. A cada elemento que chegou atrasado, perde 1 ponto.";
        break;

      case 'presenca':
        msg = "[Presença] Começa com 10 pontos. A cada elemento ausente, perde 1 ponto.";
        break;

      case 'vestuario':
        msg = "[Inspeção] Começa com 10 pontos. Sem bastão? Perde 4 pontos; Perde também 1 ponto para CADA falta de distintivo, caneta, lenço ou vestuário.";
        break;

      case 'participacao':
        msg = "[Participação] Pergunte aos chefes...";
        break;

      case 'espiritoEscoteiro':
        msg = "[Espírito Escoteiro] Pergunte aos chefes...";
        break;

      case 'jogoTecnico':
        msg = "[Jogo Técnico] Pergunte aos chefes...";
        break;

      case 'conquistas':
        msg = "[Conquistas] Especialidades: Nível 1 -> +1, Nível 2 -> +2, Nível 3 -> + 3; Progressão: +10; Insígnias especiais: +15; Cordão verde-amarelo: +20; Cordão vermelho-branco: +35; Lis de Ouro: +60";
        break;

      case 'extras':
        msg = "[Extras] Palestra: +5; Boletim: +10; Promessa: +5; Quatro reuniões seguidas: +4; Ou qualquer outra coisa, a critério dos chefes.";
        break;

      case 'penalidade':
        msg = "[Penalidade] A critério dos chefes. Fiquem espertos!";
        break;

      case 'atividadeExterna':
        msg = "[Atividade Externa] Começa com 10 pontos. A cada elemento ausente, perde 1 ponto.";
        break;

      case 'materialPatrulha':
        msg = "[Material] Pergunte aos chefes...";
        break;

      case 'cantoPatrulhaVirtual':
        msg = "[Canto Virtual]: Pergunte aos chefes...";
        break;

      case 'livrosPatrulha':
        msg = "[Livros] Pergunte aos chefes...";
        break;

      default:
        msg = "HELP: " + item;
        break;
    }

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
