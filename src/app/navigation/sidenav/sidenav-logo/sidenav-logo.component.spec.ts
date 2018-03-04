import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLogoComponent } from './sidenav-logo.component';

describe('SidenavLogoComponent', () => {
  let component: SidenavLogoComponent;
  let fixture: ComponentFixture<SidenavLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
