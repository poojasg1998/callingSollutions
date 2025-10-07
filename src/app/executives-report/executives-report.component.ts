import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data-service';
import { DatePickerModule } from 'primeng/datepicker';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-executives-report',
  templateUrl: './executives-report.component.html',
  styleUrls: ['./executives-report.component.scss'],
  imports: [
    HeaderComponent,
    DatePickerModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class ExecutivesReportComponent implements OnInit {
  dateRange: any[];

  constructor(
    public _dataService: DataService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param) => {
      this._dataService.getQueryParams();
    });
  }
}
