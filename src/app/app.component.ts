import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'air-pollution-website';
  // static baseUrl = 'http://127.0.0.1:5000/';
  static baseUrl = 'https://air-pollution-filter-website-fpp3whabmq-lz.a.run.app/';
  static imageType = 'jpeg';
  static language = 'rs';

  constructor() { }

  changeLanguage() {
    if (AppComponent.language === 'rs') {
      AppComponent.language = 'en';
    } else {
      AppComponent.language = 'rs';
    }
  }

  get getLanguage() {
    return AppComponent.language;
  }
}
