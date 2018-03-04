import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, trigger, state,
  animate, transition, style } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { startWith } from 'rxjs/operators/startWith';
import {Subject} from 'rxjs/Subject';

import { NavigationItems, NavCategory } from '../../../shared/nav-items/nav-items';


@Component({
  selector: 'bds-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ]
})
export class SidenavMenuComponent implements OnInit, OnDestroy {
  @Input() params: Observable<Params>;
  @Output() closeSidenav = new EventEmitter<void>();
  expansions = {};
  private _onDestroy = new Subject<void>();

  constructor(public navItems: NavigationItems, private _router: Router) { }

  ngOnInit() {
    this._router.events.pipe(
      startWith(null),
      switchMap(() => this.params),
      takeUntil(this._onDestroy)
    ).subscribe(p => this.setExpansions(p));

  }

  sidenavClose() {
    this.closeSidenav.emit();
  }

  // A reprendre
  setExpansions(params: Params) {
    const categories = this.navItems.getCategories('navigation');

    for (const category of categories) {
      if (this.expansions[category.id] === true) {
        continue;
      }

      let match = false;
      for (const item of category.items) {
        if (this._router.url.indexOf(item.route) > -1) {
          match = true;
          break;
        }
      }
      this.expansions[category.id] = match;
    }
  }

   /** Gets the expanded state */
   _getExpandedState(category: string) {
    return this.getExpanded(category) ? 'expanded' : 'collapsed';
  }

  /** Toggles the expanded state */
  toggleExpand(category: string) {
    this.expansions[category] = !this.expansions[category];

  }

  /** Gets whether expanded or not */
  getExpanded(category: string): boolean {
    return this.expansions[category];
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
