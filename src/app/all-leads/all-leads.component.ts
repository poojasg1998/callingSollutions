import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data-service';
import { ScrollCenterDirective } from '../directives/scroll-center.directive';
@Component({
  selector: 'app-all-leads',
  templateUrl: './all-leads.component.html',
  styleUrls: ['./all-leads.component.scss'],
  imports: [
    HeaderComponent,
    IonicModule,
    DatePickerModule,
    CommonModule,
    FormsModule,
    ScrollCenterDirective,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AllLeadsComponent implements OnInit {
  filteredParams = {
    isDateFilter: '',
    fromdate: '',
    todate: '',
    callStatus: '',

    execid: '',
    callRecord: '',
    clientnum: '',
    leadName: '',
    lastUpdate: '',
  };

  constructor(public _dataService: DataService) {}

  ngOnInit() {
    this.filteredParams = this._dataService.getQueryParams(this.filteredParams);
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
      callStatus: 'allCalls',

      execid: '',
      callRecord: '',
      clientnum: '',
      leadName: '',
      lastUpdate: '',
    };
    this._dataService.addQueryParams(this.filteredParams);
  }

  onStages(stage) {
    this.filteredParams.callStatus = stage;
    this._dataService.addQueryParams(this.filteredParams);
  }
}
