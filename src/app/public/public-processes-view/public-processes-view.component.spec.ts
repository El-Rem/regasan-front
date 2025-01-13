import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProcessesViewComponent } from './public-processes-view.component';

describe('PublicProcessesViewComponent', () => {
  let component: PublicProcessesViewComponent;
  let fixture: ComponentFixture<PublicProcessesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicProcessesViewComponent]
    });
    fixture = TestBed.createComponent(PublicProcessesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
