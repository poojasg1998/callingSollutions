import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data-service';
import { ConfirmationService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-hourly-report',
  templateUrl: './hourly-report.component.html',
  styleUrls: ['./hourly-report.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    HeaderComponent,
    DatePickerModule,
    AutoCompleteModule,
    SelectModule,
  ],
  providers: [ConfirmationService],
  encapsulation: ViewEncapsulation.None,
})
export class HourlyReportComponent implements OnInit {
  filteredParams = {
    isDateFilter: '',
    fromdate: '',
    todate: '',
    isZeroActiveLeads: 'true',
  };
  searchVisible = false;
  selectedExec;
  executiveList1;
  isCustomDate = false;

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
  checkIfBeforeTargetDate() {
    return false;
  }
  checkIfAfterTargetDate() {
    return true;
  }
  changeDate(data) {}
  onExecInput(data) {}
  onExecSelected(data) {}
  filterExecName(event) {}
  searchMembers() {}
  onToggleZeroActivityReport(event) {}
}
