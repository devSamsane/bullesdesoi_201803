import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionSeancesComponent } from './description-seances.component';

describe('DescriptionSeancesComponent', () => {
  let component: DescriptionSeancesComponent;
  let fixture: ComponentFixture<DescriptionSeancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionSeancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionSeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
