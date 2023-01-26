import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerRegistrationComponent } from './lecturer-registration.component';

describe('LecturerRegistrationComponent', () => {
  let component: LecturerRegistrationComponent;
  let fixture: ComponentFixture<LecturerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturerRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
