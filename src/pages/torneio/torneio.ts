import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { CicloDetalhePage } from '../ciclo-detalhe/ciclo-detalhe';

@IonicPage()
@Component({
  selector: 'page-torneio',
  templateUrl: 'torneio.html'
})

export class TorneioPage {
  maxPontos: number;

  torneioItems: any[];

  constructor(public navCtrl: NavController) {
    this.maxPontos = 250;

    this.torneioItems = [{
      id: "Setembro 2017",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }, {
      id: "Agosto 2017",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }, {
      id: "Julho 2017",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }, {
      id: "Junho 2017",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }, {
      id: "Maio 2017",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }, {
      id: "Abril 2017",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }, {
      id: "Março 2017",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }, {
      id: "Fevereiro 2017",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }, {
      id: "Janeiro 2017",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }, {
      id: "Dezembro 2016",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }, {
      id: "Novembro 2016",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }, {
      id: "Outubro 2016",
      patrulha: [{
        nome: "Tirano",
        avatar: 'assets/img/patrulhas/tiranossauro.png',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#CC9900"
      }, {
        nome: "Titano",
        avatar: 'assets/img/patrulhas/titanossauro.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006666"
      }, {
        nome: "Tri",
        avatar: 'assets/img/patrulhas/triceratops.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#841F27"
      }, {
        nome: "TDS",
        avatar: 'assets/img/patrulhas/tds.jpg',
        pontos: Math.round(Math.random() * this.maxPontos),
        cor: "#006699"
      }]
    }]
  }

  ionViewDidLoad() {
  }

  barClicked(evt, idItem, idPatrulha) {
    console.log("Agora vai! + " + JSON.stringify(evt) + " " + idItem + " " +idPatrulha);
    this.navCtrl.push('CicloDetalhePage', {});
  }
}
