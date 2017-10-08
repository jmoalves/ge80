import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HelpCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'help-card',
  templateUrl: 'help-card.html'
})
export class HelpCardComponent {
  @Input("nome") nome;
  @Input("tipo") tipo;
  @Input("pontos") pontos;

  constructor() {
  }
}
