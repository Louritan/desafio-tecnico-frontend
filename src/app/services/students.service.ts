import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IStudent {
    id: number;
    name: string;
    age: number;
}

interface IGrade {
    id: number;
    studentId: number;
    subject: string;
    grade: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private endpoint = 'https://localhost:7002/api/student';

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get<{ students: IStudent[] }>(`${this.endpoint}`);
  }

  postStudent({
    name,
    age,
  }: {
    name: string;
    age: number;
  }) {
    return this.http.post<{ id: number }>(`${this.endpoint}`, {
        name,
        age,
    });
  }

  getStudentGrades(studentId: number) {
    return this.http.get<{ studentGrades: IGrade[] }>(`${this.endpoint}/${studentId}`);
  }
}
