import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdulteComponent } from './adulte.component';

describe('AdulteComponent', () => {
  let component: AdulteComponent;
  let fixture: ComponentFixture<AdulteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdulteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdulteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
