import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSuccessComponent } from './import-success.component';

describe('ImportSuccessComponent', () => {
  let component: ImportSuccessComponent;
  let fixture: ComponentFixture<ImportSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
