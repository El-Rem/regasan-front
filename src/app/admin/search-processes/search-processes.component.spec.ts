import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProcessesComponent } from './search-processes.component';

describe('SearchProcessesComponent', () => {
  let component: SearchProcessesComponent;
  let fixture: ComponentFixture<SearchProcessesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchProcessesComponent]
    });
    fixture = TestBed.createComponent(SearchProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
