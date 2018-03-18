import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { TorneioProvider } from '../../providers/torneio/torneio';
import { PatrulhaProvider } from '../../providers/patrulha/patrulha';
import { Ciclo } from '../../models/torneio/ciclo';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage({
  segment: 'torneio/:ano'
})
@Component({
  selector: 'page-torneio-meses',
  templateUrl: 'torneio-meses.html'
})
export class TorneioMesesPage {
  ano = null;
  torneioItems: Ciclo[] = [];

  constructor(
      private navCtrl: NavController,
      private alertCtrl: AlertController,
      navParams: NavParams,
      firebasePrv: FirebaseProvider,
      private torneioProvider: TorneioProvider,
      private patrulaProvider: PatrulhaProvider) {

    // if (!this.firebasePrv.isAuthenticated()) {
    //   this.navCtrl.setRoot('LoginPage');
    //   return;
    // }

    console.log("PARM: " + JSON.stringify(navParams));
    if (navParams.data.ano) {
      this.ano = navParams.data.ano;
    }

    this.torneioProvider.ciclos(this.ano).then((ciclos) => {
      this.torneioItems = ciclos;
    }).catch((error) => {
      this.showAlert('Não há dados para ' + this.ano);
      this.torneioProvider.anos().then((anos) => {
        // console.log("Anos: " + anos);
        if (anos && anos.length > 0) {
          this.navCtrl.push('TorneioMesesPage', { ano: Object.keys(anos)[0] });
        }
      })
    });
  }

  ionViewDidLoad() {
  }

  showAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  detail(evt, ciclo, idPatrulha) {
    // console.log("Para detalhe => " + JSON.stringify(evt) + " Ciclo: " + idCiclo + " Patrulha: " + idPatrulha);
    this.navCtrl.push('TorneioDetalhePage', { ciclo: ciclo, idPatrulha: idPatrulha });
  }

  refresh(evt) {
    console.log("REFRESH - Begin",  evt);
    this.patrulaProvider.load();
    this.torneioProvider.reload();

    this.torneioProvider.ciclos(this.ano).then((ciclos) => {
      this.torneioItems = ciclos;
      console.log("REFRESH - END");
    });
  }
}
