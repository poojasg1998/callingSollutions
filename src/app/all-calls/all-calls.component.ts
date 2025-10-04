import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollCenterDirective } from '../directives/scroll-center.directive';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-all-calls',
  templateUrl: './all-calls.component.html',
  styleUrls: ['./all-calls.component.scss'],
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
export class AllCallsComponent implements OnInit {
  filteredParams = {
    isDateFilter: '',
    fromdate: '',
    todate: '',
    callStatus: '',
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

  onStages(stage) {
    this.filteredParams.callStatus = stage;
    this._dataService.addQueryParams(this.filteredParams);
  }
}
