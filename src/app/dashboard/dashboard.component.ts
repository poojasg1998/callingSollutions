import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data-service';
import { HeaderComponent } from '../header/header.component';
import { DatePickerModule } from 'primeng/datepicker';
import { EchoService } from '../services/echo.service';
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
  filteredParams = {
    isDateFilter: '',
    fromdate: '',
    todate: '',
    execid: '',
    callRecord: '',
    clientnum: '',
    leadName: '',
    lastUpdate: '',
  };

  constructor(
    public _dataService: DataService,
    private _echoService: EchoService
  ) {}

  ngOnInit() {
    this.filteredParams = this._dataService.getQueryParams(this.filteredParams);
    this._echoService.listenToChannel(
      'database-changes',
      '.DatabaseNotification',
      (message) => {
        console.log(message);
      }
    );
  }

  selectDateFilter(dateType) {
    this.filteredParams = this._dataService.selectDateFilter(
      dateType,
      this.filteredParams
    );
    this._dataService.addQueryParams(this.filteredParams);
  }

  getsevenDaysAgo() {
    const today = new Date();
    today.setDate(today.getDate() - 6);
    return today.toISOString().split('T')[0];
  }

  reset() {
    this.filteredParams = {
      fromdate: this._dataService.getTodayDate(),
      todate: this._dataService.getTodayDate(),
      isDateFilter: 'today',
      execid: '',
      callRecord: '',
      clientnum: '',
      leadName: '',
      lastUpdate: '',
    };
    this._dataService.addQueryParams(this.filteredParams);
  }
}
