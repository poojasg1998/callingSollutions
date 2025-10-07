import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  laravel_api = 'https://lead247-laravel-api.right2shout.in';
  superadminAzureUrl = 'https://superadmin-azure.right2shout.in/admincrm/';

  constructor(private http: HttpClient) {}

  loginotpsend(number): Observable<any> {
    const headers = new HttpHeaders({
      'Custom-Otp-Origin': 'hfdRVuy&Th#icarmAnOp^shdg',
    });
    const body = { number: number };
    return this.http
      .post(this.laravel_api + '/crmerotpdfgxsendingbbuyu', body, { headers })
      .pipe(retry(0), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  login(username, password, deviceid, browser) {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('deviceid', deviceid)
      .set('browser', browser);
    return this.http.post(this.superadminAzureUrl + '/login', params);
  }
}
