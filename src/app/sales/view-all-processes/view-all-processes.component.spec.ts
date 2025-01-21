import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllProcessesComponent } from './view-all-processes.component';

describe('ViewAllProcessesComponent', () => {
  let component: ViewAllProcessesComponent;
  let fixture: ComponentFixture<ViewAllProcessesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllProcessesComponent]
    });
    fixture = TestBed.createComponent(ViewAllProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
