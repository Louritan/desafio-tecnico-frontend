import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentGradeService {
  private endpoint = 'https://localhost:7002/api/studentgrade';

  constructor(private http: HttpClient) { }

  postStudentGrade({
    studentId,
    subject,
    grade,
  }: {
    studentId: number;
    subject: string;
    grade: number;
  }) {
    return this.http.post<{ id: number }>(`${this.endpoint}`, {
      studentId,
      subject,
      grade,
    });
  }
}
