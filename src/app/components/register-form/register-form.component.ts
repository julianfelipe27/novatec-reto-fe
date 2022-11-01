import { Component,Input, OnInit } from '@angular/core';
import { Student } from "../../model/Student"
import { Teacher } from "../../model/Teacher"
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CrudOperations } from "../../services/crud-operations.service"
import { TEACHER, STUDENT } from '../../configuration/constants';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  providers: [FormBuilder]
})
export class RegisterFormComponent implements OnInit {

  student: Student;
  teacher: Teacher;

  @Input() userType: String;
  @Input() renderDataForm: () => void;


  formGroupStudent: FormGroup;
  formGroupTeacher: FormGroup;

  //services

  constructor(public crudOp: CrudOperations,private formBuilder: FormBuilder) { 
    this.userType = STUDENT;
    this.student = new Student();
    this.teacher = new Teacher();
    this.formGroupStudent = new FormGroup([]);
    this.formGroupTeacher = new FormGroup([]);
  }

  ngOnInit(): void {
    
  }

  ngAfterContentInit(){
    this.formGroupStudent = this.formBuilder.group({
      'code': ['', Validators.required],
      'name': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
      'email': ['', Validators.required],
      'address': ['', Validators.required],
      'dateOfBirth': ['', Validators.required],
      'gender': ['', Validators.required],
      'course': ['', Validators.required],
    });
    this.formGroupTeacher = this.formBuilder.group({
      'identification': ['', Validators.required],
      'name': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
      'email': ['', Validators.required],
      'address': ['', Validators.required],
      'dateOfBirth': ['', Validators.required],
      'gender': ['', Validators.required],
      'subject': ['', Validators.required],
    })
  }

  async registerUser(){
    if(this.userType == STUDENT){
        if(this.formGroupStudent.valid){
          this.student.code = this.formGroupStudent.controls["code"].value;
          this.student.name = this.formGroupStudent.controls["name"].value;
          this.student.phoneNumber = this.formGroupStudent.controls["phoneNumber"].value;
          this.student.email = this.formGroupStudent.controls["email"].value;
          this.student.address = this.formGroupStudent.controls["address"].value;
          this.student.dateOfBirth = this.formGroupStudent.controls["dateOfBirth"].value;
          this.student.gender = this.formGroupStudent.controls["gender"].value;
          this.student.course = this.formGroupStudent.controls["course"].value;
          this.student.active = true;
          await this.crudOp.registerStudent(this.student).then(res =>{
            alert("Registrado con exito")
            this.formGroupStudent.reset();
          }).catch(err =>{
            alert("Error registrando estudiante :: "+ err)
          })
        }
    }else{
      if(this.formGroupTeacher.valid){
        this.teacher.identification = this.formGroupTeacher.controls["identification"].value;
        this.teacher.name = this.formGroupTeacher.controls["name"].value;
        this.teacher.phoneNumber = this.formGroupTeacher.controls["phoneNumber"].value;
        this.teacher.email = this.formGroupTeacher.controls["email"].value;
        this.teacher.address = this.formGroupTeacher.controls["address"].value;
        this.teacher.dateOfBirth = this.formGroupTeacher.controls["dateOfBirth"].value;
        this.teacher.gender = this.formGroupTeacher.controls["gender"].value;
        this.teacher.subjects = this.formGroupTeacher.controls["subject"].value;
        this.teacher.active = true;
        this.crudOp.registerTeacher(this.teacher).then(res =>{
          alert("Registrado con exito")
          this.formGroupTeacher.reset();
        }).catch(err =>{
          alert("Error registrando estudiante :: "+ err)
        })
      }
    }
    window.location.reload();
    this.renderDataForm();
  }

}
