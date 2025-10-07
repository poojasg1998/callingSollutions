import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { filter } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  headerTitle = 'Dashboard';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;

        if (url.includes('/dashboard')) {
          this.headerTitle = 'Call Dashboard';
        } else if (url.includes('/all-leads')) {
          this.headerTitle = 'All Leads';
        } else if (url.includes('/all-calls')) {
          this.headerTitle = 'All Calls';
        } else if (url.includes('/reports')) {
          this.headerTitle = 'Reports';
        } else if (url.includes('/live-calls')) {
          this.headerTitle = 'Live Calls';
        } else if (url.includes('/hourly-report')) {
          this.headerTitle = 'Call Hourly Report';
        } else if (url.includes('/monthly-report')) {
          this.headerTitle = 'Call Monthly Report';
        } else if (url.includes('/executives-report')) {
          this.headerTitle = 'Executive Report';
        } else {
          this.headerTitle = 'App';
        }
      });
  }
}
