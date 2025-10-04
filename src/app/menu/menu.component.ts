import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IonicModule } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DataService } from '../services/data-service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonicModule, FormsModule, RouterModule, ButtonModule],
})
export class MenuComponent implements OnInit {
  showMenu = true;

  constructor(
    public menu: MenuController,
    private router: Router,
    public _dataService: DataService
  ) {}
  ngOnInit() {}
}
