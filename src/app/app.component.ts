import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {Router, RoutesRecognized} from '@angular/router';
import {AppTitleService} from './services/app-title/app-title.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  title: string;

  constructor(private menu: MenuController, private router: Router, private appTitleService: AppTitleService) {
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  ngOnInit(): void {
    this.appTitleService.subscribe((title: string) => {
      this.title = title;
    });
    this.setTitleFromRouterData();
  }

  private setTitleFromRouterData() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.title = data.state.root.firstChild.data.hasOwnProperty('title') ? data.state.root.firstChild.data.title : '';
      }
    });
  }
}
