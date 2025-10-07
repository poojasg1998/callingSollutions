import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollCenterDirective } from '../directives/scroll-center.directive';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data-service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(
    public _dataService: DataService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param) => {
      this._dataService.getQueryParams();
    });
  }

  onStages(stage) {
    this._dataService.filteredParams.callStatus = stage;
    this._dataService.addQueryParams();
  }
}
