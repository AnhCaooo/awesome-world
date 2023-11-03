import { Component, OnInit } from '@angular/core';
import { Page } from './models/page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public readonly title = 'Awesome World Application';
  private readonly mainPage: Page = {route: '/main', name: 'Main'};
  private readonly aboutPage: Page = {route: '/about', name: 'About'};
  links: Page[] = [];
  
  ngOnInit(): void {
    this.links = [this.mainPage, this.aboutPage];
  }
}
