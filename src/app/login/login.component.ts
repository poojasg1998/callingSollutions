import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgOtpInputModule } from 'ng-otp-input';
import { ButtonModule } from 'primeng/button';
import { EchoService } from '../services/echo.service';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    IonicModule,
    NgOtpInputModule,
    FormsModule,
    ButtonModule,
    CommonModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class LoginComponent implements OnInit {
  isPasswordVisible = false;
  isOtpLogin = false;
  timerInterval;
  timer: string;
  otpResend: boolean = false;
  loginData = { username: '', password: '', number: '', otpmodel: '' };
  isOtpSend: boolean;

  constructor(
    private _echoService: EchoService,
    private _apiService: ApiService,
    private confirmationService: ConfirmationService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._echoService.listenToChannel(
      'database-changes',
      '.DatabaseNotification',
      (message) => {
        console.log(message);
      }
    );
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onLoginSubmit() {
    if (this.isOtpLogin) {
      this.startTimer(30);
      this._apiService
        .loginotpsend(this.loginData.number)
        .subscribe((success) => {
          if (success['status'] == 'True') {
            this.isOtpSend = true;
          } else {
            this.confirmationService.confirm({
              message: 'Please check your number',
              header: 'Number Not Registered',
              icon: 'pi pi-times-circle',
              acceptLabel: 'Ok',
              rejectVisible: false,
              accept: () => {
                console.log('User clicked Ok');
              },
            });
            this.loginData.number = '';
          }
        });
    } else {
      this.isOtpSend = false;
      this._apiService
        .login(
          this.loginData.username,
          this.loginData.password,
          'Mobile',
          'Android'
        )
        .subscribe((success) => {
          console.log(success);
          if (success['status'] == 'True') {
            this._authService.login('true');
          }
        });
    }
  }

  //method to start timer when OTP sent
  startTimer(minute) {
    let seconds: number = minute;
    let textSec: any = '0';
    let statSec: number = 30;
    const prefix = minute < 10 ? '0' : '';
    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.timer = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        this.otpResend = true;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  resendOtp() {
    this.otpResend = false;
    this.isOtpLogin = false;
    this.onLoginSubmit();
  }

  // to timer custom error message
  setCustomValidity(event) {
    const input = event.target;
    if (input.validity.patternMismatch) {
      input.setCustomValidity('Please enter a valid 10-digit number.');
    } else {
      input.setCustomValidity('');
    }
  }
}
