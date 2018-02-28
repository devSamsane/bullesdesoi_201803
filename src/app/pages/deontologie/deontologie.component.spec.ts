import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeontologieComponent } from './deontologie.component';

describe('DeontologieComponent', () => {
  let component: DeontologieComponent;
  let fixture: ComponentFixture<DeontologieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeontologieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeontologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
