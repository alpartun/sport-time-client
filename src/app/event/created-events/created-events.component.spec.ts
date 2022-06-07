import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedEventsComponent } from './created-events.component';

describe('CreatedEventsComponent', () => {
  let component: CreatedEventsComponent;
  let fixture: ComponentFixture<CreatedEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
