import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subscription } from 'rxjs/Subscription';

import { NavigationItems } from './../../shared/nav-items/nav-items';


@Component({
  selector: 'bds-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  params: Observable<Params>;

  constructor(
    public navItems: NavigationItems,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.params = combineLatest(
      this.activeRoute.pathFromRoot.map(route => route.params), Object.assign
    );
  }


}
