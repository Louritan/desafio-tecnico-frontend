import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StudentGradeService } from '../../services/student-grade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-student-grade-form',
  imports: [FormsModule],
  templateUrl: './register-student-grade-form.html',
  styleUrl: './register-student-grade-form.css'
})
export class RegisterStudentGradeForm {
  @Input() studentId: number = 0;

  constructor(
    private activeModal: NgbActiveModal,
    private studentGradeService: StudentGradeService,
  ) { }

  loading: boolean = false;
  subject: string = '';
  grade: number = 0;

  registerStudentGrade() {
    this.loading = true;
    this.studentGradeService.postStudentGrade({
      studentId: this.studentId,
      subject: this.subject,
      grade: this.grade,
    }).subscribe({
      next: (_response) => {
        this.loading = false;
        this.closeModal(true);
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
        if (error.error.errorMessages) {
          Swal.fire(error.error.errorMessages.join('\n'), '', 'error');
          return;
        }

        Swal.fire('Failed to register student grade', '', 'error');
      }
    });
  }

  closeModal(refetch: boolean = false) {
    this.activeModal.close(refetch);
  }
}
