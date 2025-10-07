import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-live-calls',
  templateUrl: './live-calls.component.html',
  styleUrls: ['./live-calls.component.scss'],
  imports: [HeaderComponent, CommonModule, FormsModule, IonicModule],
})
export class LiveCallsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
