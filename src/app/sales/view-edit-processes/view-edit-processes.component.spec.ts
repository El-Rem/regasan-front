import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditProcessesComponent } from './view-edit-processes.component';

describe('ViewEditProcessesComponent', () => {
  let component: ViewEditProcessesComponent;
  let fixture: ComponentFixture<ViewEditProcessesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEditProcessesComponent]
    });
    fixture = TestBed.createComponent(ViewEditProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
