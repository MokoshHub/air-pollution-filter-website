import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('panelState', [
      state('closed', style({
        height: '0px',
        overflow: 'hidden',
        opacity: 0
      })),
      state('open', style({
        height: '*',
        opacity: 1
      })),
      transition('closed => open', [
        animate('300ms ease-out')
      ]),
      transition('open => closed', [
        animate('300ms ease-in')
      ])
    ])
  ]
})

export class AppComponent {
  title = 'air-pollution-website';
  // static baseUrl = 'http://127.0.0.1:5000/';
  static baseUrl = 'https://air-pollution-filter-website-fpp3whabmq-lz.a.run.app/';
  static imageType = 'jpeg';
  static language = 'rs';

  openPanel: number | null = 1;

  constructor() { }

  changeLanguage() {
    AppComponent.language = AppComponent.language === 'rs' ? 'en' : 'rs';
  }

  get getLanguage() {
    return AppComponent.language;
  }

  togglePanel(panelNumber: number) {
    this.openPanel = this.openPanel === panelNumber ? null : panelNumber;
  }

  isPanelOpen(panelNumber: number): boolean {
    return this.openPanel === panelNumber;
  }
}
