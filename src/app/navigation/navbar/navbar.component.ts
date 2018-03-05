import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ComponentPageTitle } from '../../shared/page-title/page-title';

@Component({
  selector: 'bds-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() isSidenavToggle = new EventEmitter<void>();
  title = 'Bulles de Soi';
  toggleIcon: boolean;

  constructor(public componentPageTitle: ComponentPageTitle) { }

  getTitle() {
    return this.componentPageTitle.title;
  }

  ngOnInit() {
    this.toggleIcon = false;
  }

  toggleSidenav() {
    this.isSidenavToggle.emit();
  }

  toggleIconClick() {
    this.toggleIcon = !this.toggleIcon;
  }

}
