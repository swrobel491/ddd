import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAnalysisComponent } from './calendar-analysis.component';

describe('CalendarAnalysisComponent', () => {
  let component: CalendarAnalysisComponent;
  let fixture: ComponentFixture<CalendarAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
