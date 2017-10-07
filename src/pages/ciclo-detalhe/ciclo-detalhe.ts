import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

import { Ciclo, PontuacaoPatrulha } from '../../models/torneio/ciclo';

import { TorneioProvider } from '../../providers/torneio/torneio';
import { PatrulhaProvider } from '../../providers/patrulha/patrulha';

@IonicPage()
@Component({
  selector: 'page-ciclo-detalhe',
  templateUrl: 'ciclo-detalhe.html',
})
export class CicloDetalhePage {
  @ViewChild('slides') slides:Slides;

  ciclo: Ciclo;
  slideInicial: number;
  subGrupo: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private torneioProvider: TorneioProvider, private patrulaProvider: PatrulhaProvider) {

    this.ciclo = navParams.data.ciclo;
    // console.log("Ciclo[" + this.ciclo.id + "] tem " + this.ciclo.patrulhaArray.length + " patrulhas");
    for (let i in this.ciclo.patrulhaArray) {
      // console.log("Patrulha: " + i);
      let patrulha:PontuacaoPatrulha = this.ciclo.patrulhaArray[i];
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
    console.log("REFRESH - Begin",  evt);
    this.patrulaProvider.load();
    this.torneioProvider.reload();

    this.torneioProvider.ciclo(this.ciclo.id).then((ciclo) => {
      this.ciclo = ciclo;
      console.log("REFRESH - END");
      this.slides.update();
    });
  }

  setGrupo(grupo:string) {
    this.subGrupo = grupo;
  }
}
