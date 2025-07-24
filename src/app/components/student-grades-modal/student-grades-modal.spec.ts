import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradesModal } from './student-grades-modal';

describe('StudentGradesModal', () => {
  let component: StudentGradesModal;
  let fixture: ComponentFixture<StudentGradesModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentGradesModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGradesModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
