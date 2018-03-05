import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, UrlSegment, Params, Router, RouterModule, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

 import { NavigationItems } from './../../shared/nav-items/nav-items';
import { MatSidenav } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'bds-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  params: Observable<Params>;
  scrollSpy: number;
  private scrollTimeout = 50;
  private currentUrl: string;
  private activeUrlSubscription$: Subscription;

  constructor(
    public navItems: NavigationItems,
    private activeRoute: ActivatedRoute,
    private router: Router,
    // zone: NgZone
  ) { }

  // scrollSpyHandler(event) {
  //   setTimeout(() => {
  //     if (this.currentUrl === '/') {
  //       this.scrollSpy = event.target.scrollTop;
  //       console.log(this.scrollSpy);
  //     } else {
  //       console.log('pas sur home');
  //     }
  //   }, this.scrollTimeout);
  // }

  ngOnInit() {
    this.params = combineLatest(
      this.activeRoute.pathFromRoot.map(route => route.params), Object.assign
    );
  }

  // ngAfterViewInit() {
  //   this.activeUrlSubscription$ = this.router.events
  //     .subscribe((res) => {
  //       this.currentUrl = this.router.url;
  //   });
  // }

  // ngOnDestroy() {
  //   if (this.activeUrlSubscription$) {
  //     this.activeUrlSubscription$.unsubscribe();
  //   }
  // }

}
