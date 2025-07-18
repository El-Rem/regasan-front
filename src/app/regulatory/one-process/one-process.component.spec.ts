import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneProcessComponent } from './one-process.component';

describe('OneProcessComponent', () => {
  let component: OneProcessComponent;
  let fixture: ComponentFixture<OneProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneProcessComponent]
    });
    fixture = TestBed.createComponent(OneProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
