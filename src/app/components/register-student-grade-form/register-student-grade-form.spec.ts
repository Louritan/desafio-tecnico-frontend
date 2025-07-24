import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStudentGradeForm } from './register-student-grade-form';

describe('RegisterStudentGradeForm', () => {
  let component: RegisterStudentGradeForm;
  let fixture: ComponentFixture<RegisterStudentGradeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStudentGradeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStudentGradeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
