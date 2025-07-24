import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from '../../services/students.service';
import Swal from 'sweetalert2';
import { RegisterStudentGradeForm } from '../register-student-grade-form/register-student-grade-form';

@Component({
  selector: 'app-student-grades-modal',
  imports: [],
  templateUrl: './student-grades-modal.html',
  styleUrl: './student-grades-modal.css'
})
export class StudentGradesModal implements OnInit {
  @Input() studentId: number = 0

  constructor(
    private activeModal: NgbActiveModal,
    private studentsService: StudentsService,
    private modalService: NgbModal,
  ) { }

  loading: boolean = false;
  studentGrades: any[] = [];

  ngOnInit(): void {
    this.getStudentGrades();
  }

  getStudentGrades() {
    this.loading = true;
    this.studentsService.getStudentGrades(this.studentId).subscribe({
      next: (response) => {
        this.studentGrades = response.studentGrades;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
        if (error.error.errorMessages) {
          Swal.fire(error.error.errorMessages.join('\n'), '', 'error');
          return;
        }

        Swal.fire('Failed to fetch student grades', '', 'error');
      }
    });
  }

  openRegisterStudentGradeModal() {
    const registerStudentGradeModal = this.modalService.open(RegisterStudentGradeForm, { size: 'lg' });
    registerStudentGradeModal.componentInstance.studentId = this.studentId;
    registerStudentGradeModal.result.then(result => {
      if (result) {
        this.getStudentGrades();
      }
    }).catch(() => { });
  }

  closeModal() {
    this.activeModal.close();
  }
}
