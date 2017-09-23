import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-torneio',
  templateUrl: 'torneio.html'
})

export class TorneioPage {
  maxPontos: number;

  @ViewChildren('barCanvas') barCanvas;
  barChart: any[];

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
    this.barCanvas.forEach((canvas) => {
      this.barChart = new Chart(canvas.nativeElement, {
        type: 'horizontalBar',
        data: {
          labels: ["Tirano", "TDS", "Titano", "Tri"],
          datasets: [{
            label: '',
            data: [
              Math.round(Math.random() * 200),
              Math.round(Math.random() * 200),
              Math.round(Math.random() * 200),
              Math.round(Math.random() * 200)],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }

      });
    })
  }
}
