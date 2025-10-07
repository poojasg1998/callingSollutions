import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data-service';
import { HeaderComponent } from '../header/header.component';
import { DatePickerModule } from 'primeng/datepicker';
import { EchoService } from '../services/echo.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    HeaderComponent,
    DatePickerModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  @ViewChild('calendar') calendar;

  constructor(
    public _dataService: DataService,
    private _echoService: EchoService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(() => {
      this._dataService.getQueryParams();
    });

    this._echoService.listenToChannel(
      'database-changes',
      '.DatabaseNotification',
      (message) => {
        console.log(message);
      }
    );
  }

  reset() {
    // this.filteredParams = {
    //   fromdate: this._dataService.getTodayDate(),
    //   todate: this._dataService.getTodayDate(),
    //   isDateFilter: 'today',
    //   execid: '',
    //   callRecord: '',
    //   clientnum: '',
    //   leadName: '',
    //   lastUpdate: '',
    // };
    // this._dataService.addQueryParams(this.filteredParams);
  }
}
