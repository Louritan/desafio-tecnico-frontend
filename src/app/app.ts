import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterStudentForm } from './components/register-student-form/register-student-form';
import { StudentsService } from './services/students.service';
import Swal from 'sweetalert2';
import { StudentGradesModal } from './components/student-grades-modal/student-grades-modal';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    private modalService: NgbModal,
    private studentsService: StudentsService,
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  loading: boolean = false;
  students: any[] = [];

  getStudents() {
    this.loading = true;
    this.studentsService.getStudents().subscribe({
      next: (response) => {
        this.students = response.students;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        if (error.error.errorMessages) {
          Swal.fire(error.error.errorMessages.join('\n'), '', 'error');
          return;
        }

        Swal.fire('Failed to fetch students', '', 'error');
      },
    });
  }

  openRegisterStudentModal() {
    const studentModal = this.modalService.open(RegisterStudentForm, { size: 'lg' });
    studentModal.result.then(result => {
      if (result) {
        this.getStudents();
      }
    }).catch(() => { });
  }

  openStudentGradesModal(studentId: number) {
    const studentGradesModal = this.modalService.open(StudentGradesModal, { size: 'lg' });
    studentGradesModal.componentInstance.studentId = studentId;
    studentGradesModal.result.then(() => { }).catch(() => { });
  }
}
