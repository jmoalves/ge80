import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})

export class ProgressBarComponent {
  @Input('progress') progress;
  @Input('color') color;
  @Input('maximum') maximum;

  constructor() {
    this.progress = 0;
    this.color = 'blue';
    this.maximum = 100;
  }

  get currentProgress() {
    return Math.round((this.progress / this.maximum) * 100);
  }
}
