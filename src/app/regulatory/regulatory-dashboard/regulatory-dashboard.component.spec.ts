import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryDashboardComponent } from './regulatory-dashboard.component';

describe('RegulatoryDashboardComponent', () => {
  let component: RegulatoryDashboardComponent;
  let fixture: ComponentFixture<RegulatoryDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegulatoryDashboardComponent]
    });
    fixture = TestBed.createComponent(RegulatoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
