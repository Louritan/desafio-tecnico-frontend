import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStudentForm } from './register-student-form';

describe('RegisterStudentForm', () => {
  let component: RegisterStudentForm;
  let fixture: ComponentFixture<RegisterStudentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStudentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStudentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
