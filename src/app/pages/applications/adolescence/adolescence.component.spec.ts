import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdolescenceComponent } from './adolescence.component';

describe('AdolescenceComponent', () => {
  let component: AdolescenceComponent;
  let fixture: ComponentFixture<AdolescenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdolescenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdolescenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
