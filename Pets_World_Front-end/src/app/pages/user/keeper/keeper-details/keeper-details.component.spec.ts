import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeeperDetailsComponent } from './keeper-details.component';

describe('KeeperDetailsComponent', () => {
  let component: KeeperDetailsComponent;
  let fixture: ComponentFixture<KeeperDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeeperDetailsComponent]
    });
    fixture = TestBed.createComponent(KeeperDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
