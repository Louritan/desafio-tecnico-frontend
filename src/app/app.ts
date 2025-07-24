import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterStudentForm } from './components/register-student-form/register-student-form';
import { StudentsService } from './services/students.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    private modalService: NgbModal,
    private studentsService: StudentsService,
  ) { }

  students: any[] = [];

  getStudents() {
    this.studentsService.getStudents().subscribe({
      next: (response) => {
        this.students = response.students;
        console.log(response);
      },
      error: (error) => {
        console.error(error);
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
}
