import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IposPlanComponent } from './ipos-plan.component';

describe('IposPlanComponent', () => {
  let component: IposPlanComponent;
  let fixture: ComponentFixture<IposPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IposPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IposPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
