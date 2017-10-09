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
        msg = "Pontualidade: Pergunte aos chefes...";
        break;

      case 'presenca':
        msg = "Presença: Perde 1 ponto por elemento ausente. Começa com 10 pontos";
        break;

      case 'vestuario':
        msg = "Inspeção: Pergunte aos chefes...";
        break;

      case 'participacao':
        msg = "Participação:  Pergunte aos chefes...";
        break;

      case 'espiritoEscoteiro':
        msg = "Espírito Escoteiro:  Pergunte aos chefes...";
        break;

      case 'jogoTecnico':
        msg = "Jogo Técnico:  Pergunte aos chefes...";
        break;

      case 'conquistas':
        msg = "Conquistas:  Pergunte aos chefes...";
        break;

      case 'extras':
        msg = "Extras:  Pergunte aos chefes...";
        break;

      case 'penalidade':
        msg = "Penalidade:  Pergunte aos chefes...";
        break;

      case 'atividadeExterna':
        msg = "Atividade Externa:  Pergunte aos chefes...";
        break;

      case 'materialPatrulha':
        msg = "Material de Patrulha:  Pergunte aos chefes...";
        break;

      case 'cantoPatrulhaVirtual':
        msg = "Canto Virtual de Patrulha:  Pergunte aos chefes...";
        break;

      case 'livrosPatrulha':
        msg = "Livro de Patrulha:  Pergunte aos chefes...";
        break;

      default:
        msg = "HELP: " + item;
        break;
    }

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
