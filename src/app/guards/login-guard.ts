// login.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../services/data-service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const dataService = inject(DataService);
  const token = localStorage.getItem('token');

  if (token) {
    router.navigate(['/dashboard'], {
      queryParams: {
        fromdate: dataService.getTodayDate(),
        todate: dataService.getTodayDate(),
        isDateFilter: 'today',
      },
    }); // ✅ already logged in → go to dashboard
    return false;
  }
  return true; // allow login page
};
