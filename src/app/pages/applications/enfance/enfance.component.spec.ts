import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfanceComponent } from './enfance.component';

describe('EnfanceComponent', () => {
  let component: EnfanceComponent;
  let fixture: ComponentFixture<EnfanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnfanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
