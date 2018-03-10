import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ElementRef,
  Inject,
  OnDestroy
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';

import {debounceTime} from 'rxjs/operators/debounceTime';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {fromEvent} from 'rxjs/observable/fromEvent';

import { ComponentPageTitle } from '../../shared/page-title/page-title';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'bds-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    // routerTransition,
    trigger('navbarStateToggle', [
      state('transparent', style({
        backgroundColor: 'rgba(126, 87, 194, 0)'
      })),
      state('opaque', style({
        backgroundColor: 'rgba(126, 87, 194, 1)',
      })),
      transition('transparent => opaque', animate('500ms ease-in')),
      transition('opaque => transparent', animate('500ms ease-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() container: string;
  @Output() isSidenavToggle = new EventEmitter<void>();

  public navbarStateToggle = 'transparent';
  title = 'Bulles de Soi';
  toggleIcon: boolean;
  private destroyed = new Subject();
  private scrollContainer: any;
  private SCROLL_TOOLBAR_CHANGE_STATE = 200;
  private scrollOffset: any = 0;

  _rootUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public componentPageTitle: ComponentPageTitle,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.router.events.pipe(takeUntil(this.destroyed)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const rootUrl = router.url.split('#')[0];
        this._rootUrl = rootUrl;
        this.setNavbarState(rootUrl);
      }
    });
  }


  getTitle() {
    return this.componentPageTitle.title;
  }

  toggleSidenav() {
    this.isSidenavToggle.emit();
  }

  toggleIconClick() {
    this.toggleIcon = !this.toggleIcon;
  }

  private setNavbarState(url: string) {
    if (url !== '/') {
      this.navbarStateToggle = 'opaque';
    } else {
      this.navbarStateToggle = 'transparent';
    }
  }

  private getNavbarState(scrollValue: number) {
    if (scrollValue > this.SCROLL_TOOLBAR_CHANGE_STATE) {
      this.navbarStateToggle = 'opaque';
    } else if (scrollValue <= this.SCROLL_TOOLBAR_CHANGE_STATE) {
      this.navbarStateToggle = 'transparent';
    }
  }

  private getScrollOffset(scrollValue: any): void {
    if (scrollValue !== 'undefined') {
      this.getNavbarState(scrollValue);
    } else {
      this.navbarStateToggle = 'transparent';
    }
  }

  ngOnInit() {
    this.toggleIcon = false;

    Promise.resolve().then(() => {
      this.scrollContainer = this.container ? this.document.querySelector(this.container)['mat-sidenav-content'] : window;
      fromEvent(this.scrollContainer, 'scroll').pipe(
        takeUntil(this.destroyed),
        debounceTime(10))
        .subscribe((event) => {
          this.scrollOffset = this.scrollContainer.window.pageYOffset;
          if (this._rootUrl === '/') {
            this.getScrollOffset(this.scrollOffset);
          }
        });
    });
  }

  ngOnDestroy() {
    this.destroyed.unsubscribe();
  }

}
