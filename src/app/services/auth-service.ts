import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private _dataService: DataService) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(token: string) {
    this.router.navigate(['/dashboard'], {
      queryParams: {
        fromdate: this._dataService.getTodayDate(),
        todate: this._dataService.getTodayDate(),
        isDateFilter: 'today',
      },
    });
    localStorage.setItem('token', token);
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }
}
