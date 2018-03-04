import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeApplicationsComponent } from './home-applications.component';

describe('HomeApplicationsComponent', () => {
  let component: HomeApplicationsComponent;
  let fixture: ComponentFixture<HomeApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
