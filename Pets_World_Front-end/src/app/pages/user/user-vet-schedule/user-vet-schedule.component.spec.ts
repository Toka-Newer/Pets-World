import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVetScheduleComponent } from './user-vet-schedule.component';

describe('UserVetScheduleComponent', () => {
  let component: UserVetScheduleComponent;
  let fixture: ComponentFixture<UserVetScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserVetScheduleComponent]
    });
    fixture = TestBed.createComponent(UserVetScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
