import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from '../../services/students.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-student-form',
  imports: [FormsModule],
  templateUrl: './register-student-form.html',
  styleUrl: './register-student-form.css'
})
export class RegisterStudentForm {
  constructor(
    private activeModal: NgbActiveModal,
    private studentsService: StudentsService,
  ) { }

  loading: boolean = false;
  name: string = '';
  age: number = 0;

  registerStudent() {
    this.loading = true;
    this.studentsService.postStudent({ name: this.name, age: this.age }).subscribe({
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

        Swal.fire('Failed to register student', '', 'error');
      }
    });
  }

  closeModal(refetch: boolean = false) {
    this.activeModal.close(refetch);
  }
}
