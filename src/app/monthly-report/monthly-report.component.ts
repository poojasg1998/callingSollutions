import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { IonContent, IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss'],
  imports: [
    IonIcon,
    IonCol,
    IonRow,
    IonContent,
    HeaderComponent,
    CommonModule,
    FormsModule,
    DatePickerModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MonthlyReportComponent implements OnInit {
  date: Date = new Date();
  dateValue: Date;
  dateRange = new Date();

  constructor() {}

  ngOnInit() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    alphabet.forEach((letter) => {
      this.alphabetNumbers[letter] = this.getRandomNumber(0, 42);
    });
  }
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  alphabetNumbers: { [key: string]: number } = {};
  getLetterForDay(day: number): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return alphabet[(day - 1) % alphabet.length];
  }

  onMonthChange(event: any) {
    const { month, year } = event;
    this.dateRange = new Date(year, month, 0);
  }
  selectDateFilter(event) {
    console.log(event);
  }
}
