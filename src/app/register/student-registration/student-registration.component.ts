import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {

  constructor(private register:RegistrationService) {}


  postError = false;
  postErrorMessage = "";
  password2: string = "";
  dob!: Date;


  orginalStudentSettings: Student = {
    _id: "123445",
    name: "",
    email: "",
    password: "",
    nic: "",
    dob: "2021/03/23",
    mobile_no: "",
    address: "",
    parent_name: "",
    parent_no: "",
    landline_no: "",
    grade: "",
    dle_access: "open",
    url: "http://localhost:5500/api/user/register",
    type: "student"
  }

  studentSettings: Student = {...this.orginalStudentSettings}

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }


  onSubmit(form: NgForm) {
    console.log('in on submit : '+ form.valid);
    if(form.valid) {
      this.postError = false;
      this.register.postUserSettingsForm(this.studentSettings).subscribe((result) => {
        if(Object.hasOwn(result,'Error')){
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');
          if(status?.value === "500"){
            this.onHttpError("Something went Wrong try again later,.. if the Issue Persists please Contact Support");
          }
          else {
            this.onHttpError(error?.value)
          }
        }
        else {
          console.log(result)
        }
      });
    }
  }


  isShowDiv: boolean = false;

  clickEvent(){
    this.isShowDiv = !this.isShowDiv;
  }

  ngOnInit(): void {}
}
