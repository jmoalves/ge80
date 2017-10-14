import { Component, Input } from '@angular/core';

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
