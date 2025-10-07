import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonRouterOutlet,
} from '@ionic/angular/standalone';

import { MenuComponent } from './menu/menu.component';
import { MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from 'primeng/confirmdialog';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    CommonModule,
    IonApp,
    IonSplitPane,
    IonRouterOutlet,
    MenuComponent,
    ConfirmDialog,
  ],
})
export class AppComponent {
  showMenu = true;

  constructor(private menu: MenuController, private router: Router) {
    this.listenToRouteChanges();
  }

  listenToRouteChanges() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const noMenuPages = ['/login', '/register', '/forgot-password'];

        this.showMenu = !noMenuPages.some((page) =>
          event.urlAfterRedirects.startsWith(page)
        );
      }
    });
  }
}
