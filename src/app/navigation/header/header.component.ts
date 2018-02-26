import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Output() isSidenavToggle = new EventEmitter<void>();
title = 'Bulles de Soi';
  constructor() { }

  ngOnInit() {
  }

  toggleSidenav() {
    this.isSidenavToggle.emit();
  }

}
