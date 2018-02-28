import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ComponentPageTitle } from './../../shared/page-title/page-title';


@Component({
  selector: 'bds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
