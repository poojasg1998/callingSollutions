import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data-service';
import { ScrollCenterDirective } from '../directives/scroll-center.directive';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    public _dataService: DataService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param) => {
      this._dataService.getQueryParams();
    });
  }

  reset() {
    // this.filteredParams = {
    //   fromdate: this._dataService.getTodayDate(),
    //   todate: this._dataService.getTodayDate(),
    //   isDateFilter: 'today',
    //   callStatus: 'allCalls',
    //   execid: '',
    //   callRecord: '',
    //   clientnum: '',
    //   leadName: '',
    //   lastUpdate: '',
    // };
    // this._dataService.addQueryParams(this.filteredParams);
  }

  onStages(stage) {
    this._dataService.filteredParams.callStatus = stage;
    this._dataService.addQueryParams();
  }
}
