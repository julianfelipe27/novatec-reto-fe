import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../model/Student';
import { Teacher } from '../model/Teacher';
import { BACKEND_ENDPOINT_LOCAL } from '../configuration/constants';
import { firstValueFrom } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class CrudOperations {

  constructor(private http: HttpClient) {
  }

  registerStudent(student: Student): Promise<any> {
    const urlEndpoint = `${BACKEND_ENDPOINT_LOCAL}/students`;
    return firstValueFrom(this.http.post<any>(urlEndpoint, student));
  }

  getStudents(): Promise<any> {
    const urlEndpoint = `${BACKEND_ENDPOINT_LOCAL}/students`;
    return firstValueFrom(this.http.get<any>(urlEndpoint));
  }

  registerTeacher(teacher: Teacher): Promise<any> {
    const urlEndpoint = `${BACKEND_ENDPOINT_LOCAL}/teachers`;
    return firstValueFrom(this.http.post<any>(urlEndpoint, teacher));
  }

  getTeachers(): Promise<any> {
    const urlEndpoint = `${BACKEND_ENDPOINT_LOCAL}/teachers`;
    return firstValueFrom(this.http.get<any>(urlEndpoint));
  }


}
