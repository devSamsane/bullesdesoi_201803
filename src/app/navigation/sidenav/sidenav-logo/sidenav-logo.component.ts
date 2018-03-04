import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bds-sidenav-logo',
  templateUrl: './sidenav-logo.component.html',
  styleUrls: ['./sidenav-logo.component.scss']
})
export class SidenavLogoComponent implements OnInit {

  logoLink = '../../../assets/logos/logo-bullesdeSoi-DP500.png';
  title = 'Bulles de Soi';

  constructor() { }

  ngOnInit() {
  }

}
