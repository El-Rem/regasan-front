import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProcessesComponent } from './view-processes.component';

describe('ViewProcessesComponent', () => {
  let component: ViewProcessesComponent;
  let fixture: ComponentFixture<ViewProcessesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProcessesComponent]
    });
    fixture = TestBed.createComponent(ViewProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
