import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bds-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']
})
export class SidenavMenuComponent implements OnInit {
@Output() closeSidenav = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  sidenavClose() {
    this.closeSidenav.emit();
  }
}
