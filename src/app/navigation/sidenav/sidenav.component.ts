import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

 import { NavigationItems } from './../../shared/nav-items/nav-items';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'bds-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  params: Observable<Params>;

  constructor(
    public navItems: NavigationItems,
    private _route: ActivatedRoute,
    private _router: Router,
    zone: NgZone
  ) { }

  ngOnInit() {
    this.params = combineLatest(
      this._route.pathFromRoot.map(route => route.params), Object.assign
    );

    console.log('params: ', this.params);

  }

}
