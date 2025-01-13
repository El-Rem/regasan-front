import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployesComponent } from './manage-employes.component';

describe('ManageEmployesComponent', () => {
  let component: ManageEmployesComponent;
  let fixture: ComponentFixture<ManageEmployesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEmployesComponent]
    });
    fixture = TestBed.createComponent(ManageEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
