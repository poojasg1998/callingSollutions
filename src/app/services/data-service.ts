import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dateRange;
  constructor(
    private menuCtrl: MenuController,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  openEndMenu() {
    this.menuCtrl.open('mainMenu');
  }

  getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  addQueryParams(filteredParams) {
    const queryParams = {};
    let paramsChanged = false;
    for (const key in filteredParams) {
      if (filteredParams.hasOwnProperty(key)) {
        // Set the param if it's not empty, otherwise set to null
        const newParamValue =
          filteredParams[key] !== '' ? filteredParams[key] : null;
        // Check if query parameters have changed
        if (this.activeRoute.snapshot.queryParams[key] !== newParamValue) {
          paramsChanged = true;
        }
        queryParams[key] = newParamValue;
      }
    }
    this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }

  getQueryParams(defaults: any = {}): any {
    const queryString = window.location.search;
    const queryParams: any = {};

    // Read all query params from URL
    new URLSearchParams(queryString).forEach((value, key) => {
      queryParams[key] = value;
    });

    // Merge with defaults
    const result: any = { ...defaults };
    Object.keys(result).forEach((key) => {
      if (queryParams.hasOwnProperty(key)) {
        result[key] = queryParams[key];
      } else if (key !== 'loginid' && key !== 'limit' && key !== 'limitrows') {
        result[key] = '';
      }
    });

    return result;
  }

  selectDateFilter(dateType, filteredParams) {
    if (dateType == 'today') {
      this.dateRange = null;
      filteredParams.isDateFilter = 'today';
      filteredParams.fromdate = this.getTodayDate();
      filteredParams.todate = this.getTodayDate();
      return filteredParams;
    } else if (dateType == 'lastsevenDay') {
      this.dateRange = null;
      filteredParams.isDateFilter = 'lastsevendays';
      filteredParams.fromdate = this.getsevenDaysAgo();
      filteredParams.todate = this.getTodayDate();
      return filteredParams;
    } else if (dateType == 'custom') {
      if (this.dateRange && this.dateRange[0] && this.dateRange[1]) {
        const fromDate = new Date(this.dateRange[0]);
        const toDate = new Date(this.dateRange[1]);

        const diffInTime = toDate.getTime() - fromDate.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        if (diffInDays >= 7) {
          this.confirmationService.confirm({
            message: 'Please select a date range of 7 days or less.',
            header: 'Warning',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Ok',
            rejectVisible: false, // only "Ok" button
            accept: () => {
              this.dateRange = null;
              filteredParams.isDateFilter = 'today';
              filteredParams.fromdate = this.getTodayDate();
              filteredParams.todate = this.getTodayDate();
            },
            reject: () => {
              this.dateRange = null;
              filteredParams.isDateFilter = 'today';
              filteredParams.fromdate = this.getTodayDate();
              filteredParams.todate = this.getTodayDate();
            },
          });
        } else {
          if (this.dateRange?.length === 2 && this.dateRange[1] != null) {
            filteredParams.isDateFilter = 'custom';
            const start = formatDate(this.dateRange[0], 'yyyy-MM-dd', 'en-US');
            const end = formatDate(this.dateRange[1], 'yyyy-MM-dd', 'en-US');
            filteredParams.fromdate = start;
            filteredParams.todate = end != '1970-01-01' ? end : '';
          } else {
            if (filteredParams.fromdate != '' && filteredParams.todate != '') {
              filteredParams.fromdate = filteredParams.fromdate;
              filteredParams.todate = filteredParams.todate;
            } else {
              filteredParams.fromdate = this.getTodayDate();
              filteredParams.todate = this.getTodayDate();
              filteredParams.isDateFilter = 'today';
              this.addQueryParams(filteredParams);
            }
          }
        }
        return filteredParams;
      } else {
        if (filteredParams.fromdate != '' && filteredParams.todate != '') {
          filteredParams.fromdate = filteredParams.fromdate;
          filteredParams.todate = filteredParams.todate;
        } else {
          filteredParams.fromdate = this.getTodayDate();
          filteredParams.todate = this.getTodayDate();
          filteredParams.isDateFilter = 'today';
        }
        return filteredParams;
      }
    }
  }

  getsevenDaysAgo() {
    const today = new Date();
    today.setDate(today.getDate() - 6);
    return today.toISOString().split('T')[0];
  }
}
