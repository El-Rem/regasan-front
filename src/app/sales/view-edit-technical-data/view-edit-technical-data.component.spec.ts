import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditTechnicalDataComponent } from './view-edit-technical-data.component';

describe('ViewEditTechnicalDataComponent', () => {
  let component: ViewEditTechnicalDataComponent;
  let fixture: ComponentFixture<ViewEditTechnicalDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEditTechnicalDataComponent]
    });
    fixture = TestBed.createComponent(ViewEditTechnicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
