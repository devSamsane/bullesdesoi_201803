import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerinataliteComponent } from './perinatalite.component';

describe('PerinataliteComponent', () => {
  let component: PerinataliteComponent;
  let fixture: ComponentFixture<PerinataliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerinataliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerinataliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
