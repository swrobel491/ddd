import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectGmailComponent } from './connect-gmail.component';

describe('ConnectGmailComponent', () => {
  let component: ConnectGmailComponent;
  let fixture: ComponentFixture<ConnectGmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectGmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectGmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
