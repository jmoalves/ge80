import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JovensProvider }  from '../../providers/jovens/jovens';
import { PatrulhaProvider }  from '../../providers/patrulha/patrulha';

import { Jovem }  from '../../models/jovem';
import { Patrulha }  from '../../models/patrulha';

@IonicPage()
@Component({
  selector: 'page-inspecao',
  templateUrl: 'inspecao.html',
})
export class InspecaoPage {
  inspecao = [];

  private patrulhas: Patrulha[] = [];
  private jovens: Jovem[] = [];

  constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        jovensPrv: JovensProvider,
        patrulhasPrv: PatrulhaProvider) {
    Promise.all([
      jovensPrv.jovens(),
      patrulhasPrv.patrulhas()])
    .then(([jovens, patrulhas]) => {
      this.jovens = jovens;
      this.patrulhas = patrulhas;

      this.ajustarInspecao();
    });
  }

  ionViewDidLoad() {
  }

  ajustarInspecao() {
    let patrulhas = [];

    for (let p of this.patrulhas) {
      patrulhas[p.id] = {
        id: p.id,
        nome: p.nome,
        jovens: []
      }
    }

    for (let jovem of this.jovens) {
      let patrulha = patrulhas[jovem.patrulha];
      patrulha.jovens.push({
        avatar: "http://sigue.escoteiros.org.br/paxtu/associado/230477.jpg",
        nome: jovem.nome,
        cargo: jovem.cargo,
        presente: true,
        distintivos: 0,
        caneta: true,
        lenco: true,
        uniforme: true
      })
    }

    let inspecao = [];
    for (let key in patrulhas) {
      inspecao.push(patrulhas[key]);
    }

    this.inspecao = inspecao;
  }

  quantos(patrulha) {
    let qtd:number = 0;
    for (let jovem of patrulha.jovens) {
      if (jovem.presente) {
        qtd++;
      }
    }

    return qtd;
  }

  jovemPresenteToggle(jovem) {
    console.log("Presente toggle: " + jovem.nome);
    if (!jovem.presente) {
      jovem.presente = true;
      return;
    }

    jovem.presente = false;
    jovem.distintivos = 0;
    jovem.caneta = true;
    jovem.lenco = true;
    jovem.uniforme = true;
  }

  jovemComDistintivo(jovem) {
    if (!jovem.presente) {
      return;
    }

    if (jovem.distintivos > 0) {
      jovem.distintivos--;
    }
  }

  jovemSemDistintivo(jovem) {
    if (!jovem.presente) {
      return;
    }

    if (jovem.distintivos < 99) {
      jovem.distintivos++;
    }
  }
}
