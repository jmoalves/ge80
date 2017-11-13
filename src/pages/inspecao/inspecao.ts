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
        bastao: true,
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

  toggleDistintivo(jovem) {
    if (!jovem.presente) {
      return;
    }

    if (jovem.distintivos > 0) {
      jovem.distintivos = 0;
    }
  }

  decrementaDistintivo(jovem) {
    if (!jovem.presente) {
      return;
    }

    if (jovem.distintivos > 0) {
      jovem.distintivos--;
    }
  }

  incrementaDistintivo(jovem) {
    if (!jovem.presente) {
      return;
    }

    if (jovem.distintivos < 99) {
      jovem.distintivos++;
    }
  }

  toggleCaneta(jovem) {
    if (!jovem.presente) {
      return;
    }

    jovem.caneta = !jovem.caneta;
  }

  toggleLenco(jovem) {
    if (!jovem.presente) {
      return;
    }

    jovem.lenco = !jovem.lenco;
  }

  toggleUniforme(jovem) {
    if (!jovem.presente) {
      return;
    }

    jovem.uniforme = !jovem.uniforme;
  }

  penalidadePatrulha(patrulha): boolean {
    for (let jovem of patrulha.jovens) {
      if (this.penalidadeJovem(jovem)) {
        return true;
      }
    }

    if (!patrulha.bastao) {
      return true;
    }

    return false;
  }

  penalidadeJovem(jovem):boolean {
    if (!jovem.presente) {
      return true;
    }

    let pontos:number = 0;

    pontos += jovem.distintivos;
    pontos += (jovem.caneta ? 0 : 1);
    pontos += (jovem.lenco ? 0 : 1);
    pontos += (jovem.uniforme ? 0 : 1);

    return pontos > 0;
  }
}
