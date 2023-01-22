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
  postErrorMessage = "Hi you are WrongHi you are WrongHi you are WrongHi you are Wrong";
  password2: string = "";
  dob!: Date;


  orginalStudentSettings: Student = {
    _id: "812456",
    name: "venurae",
    email: "venurae3511@gmail.com",
    password: "thenura1",
    nic: "200308300020",
    dob: "2021/03/23",
    mobile_no: "0783323261",
    address: "272,10c-1,subhamawatha,nugegoda",
    parent_name: "ajith wijerathne",
    parent_no: "0724945027",
    landline_no: "0112821161",
    grade: "12",
    dle_access: "open",
    url: "http://localhost:5500/api/user/register",
    type: "student"
  }

  studentSettings: Student = {...this.orginalStudentSettings}

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }


  onSubmit(form: NgForm) {
    console.log('in on submit : '+ form.valid);
    if(form.valid) {
      this.postError = false;
      this.register.postUserSettingsForm(this.studentSettings).subscribe((result) => {
        console.log(result);
        if(Object.hasOwn(result,'Error')){
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if(status?.value === "400") {
            this.onHttpError(error?.value)
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
            console.log(result)
          }
        }
        else {
          this.postError = false;
          console.log(result)
        }
      });
    }
  }


  isShowDiv: boolean = false;

  clickEvent(){
    this.isShowDiv = !this.isShowDiv;
  }

  ngOnInit(): void {
    this.register.getId()
  }
}
