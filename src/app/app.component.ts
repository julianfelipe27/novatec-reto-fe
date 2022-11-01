import { Component } from '@angular/core';
import { CrudOperations } from "./services/crud-operations.service"
import { TEACHER, STUDENT } from './configuration/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'reto-app';

  userType: String;

  data = []

  types = [
    { id: STUDENT, name: "Students" },
    { id: TEACHER, name: "Teachers" }
  ];

  constructor(public crudOp: CrudOperations,) {
    this.userType = this.types[0].id;
  }

  ngAfterContentInit() {
    this.renderData();
  }

  updateUser(type: string): void {
    this.userType = type;
    this.renderData();
  }

  renderData() {
    console.log("renderData")
    if (this.userType == STUDENT)
      this.crudOp.getStudents().then(res => {
        this.data = res.students
        console.log(this.data)
      })
    else {
      this.crudOp.getTeachers().then(res => {
        this.data = res.teachers
      })
    }
  }

}
