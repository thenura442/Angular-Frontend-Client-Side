import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { Employee } from '../../_interfaces/employee';

@Component({
  selector: 'app-lecturer-registration',
  templateUrl: './lecturer-registration.component.html',
  styleUrls: ['./lecturer-registration.component.css']
})
export class LecturerRegistrationComponent implements OnInit {
  constructor(private register:RegistrationService, private datepipe: DatePipe) {}


  postErrorFind = false;
  postErrorMessageFind = "";
  postSuccessFind = false;
  postSuccessMessageFind = "";

  postSuccess = false;
  postSuccessMessage = "false";
  postError = false;
  postErrorMessage = "";

  onTrue = false;
  date: any;
  password2: string = "";
  retypepassword: string = this.password2;

  orginalLecturerSettings: Employee = {
    _id: "",
    name: "",
    email: "",
    password: "",
    nic: "",
    dob: "",
    mobile_no: "",
    address: "",
    landline_no: "",
    dle_access: "",
    url: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    type: ""
  }

  lecturerSettings: Employee = {...this.orginalLecturerSettings}

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }


  onSubmit(form: NgForm) {
    console.log('in on submit : '+ form.valid);
    this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.lecturerSettings.dob = this.date;
    if(form.valid && this.lecturerSettings.password === this.retypepassword && this.lecturerSettings.dle_access != 'Set DLE Access') {
      this.messages();
      this.register.postEmployeeSettingsForm(this.lecturerSettings).subscribe((result) => {
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
          this.postSuccess = true;
          this.postSuccessMessage = "Operation Successful with ID - " + result._id;
          this.lecturerSettings = this.orginalLecturerSettings;
        }
      });
    }
  }

  orginalBody: any = {
    _id: '',
    type: "staff"
  }

  body: any = {...this.orginalBody}

  onFind(search: NgForm){
    console.log("in on submit "+ search.valid);
    console.log(this.body._id);
    if(search.valid && this.body._id >= 6){
      this.messages();

      this.register.findEmployeeId(this.body).subscribe((result : any) => {
        if(result == null) {
          this.postErrorMessageFind = "ID not Found!";
          this.postErrorFind = true;
          this.postSuccessFind = false;
          console.log(result);
        }
        else{
          this.lecturerSettings = result;
          this.password2 = result.password;
          this.postErrorFind = false;
          this.postSuccessFind = true;
          this.postSuccessMessageFind = "Found ID "+ result._id ;
          this.onTrue = true;

          this.retypepassword = result.password;
          console.log(result);
        }
      })
    }
  }

  onUpdate(form: NgForm){
    console.log("in on submit "+ form.valid);
    console.log(this.lecturerSettings.password)
    console.log(this.password2)
    if(form.valid && this.lecturerSettings.password === this.retypepassword && this.lecturerSettings.dle_access != 'Set DLE Access'){
      this.messages();
      this.register.updateEmployeeBody(this.lecturerSettings).subscribe((result) => {
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
          this.postSuccess = true;
          this.postSuccessMessage = "Update Successful on ID - "+result._id;
          this.lecturerSettings = {...this.orginalLecturerSettings}
        }
      });
    }
  }

  onDelete(form: NgForm){
    console.log("in on submit "+ form.valid);
    if(form.valid){
      this.messages();
      this.register.deleteEmploee(this.lecturerSettings).subscribe((result) => {
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
          this.postSuccess = true;
          this.postSuccessMessage = this.lecturerSettings._id+ " Deleted Successfully!"
          this.lecturerSettings = {...this.orginalLecturerSettings}
        }
      });
    }
  }

  onCancel():void {
    this.lecturerSettings = {...this.orginalLecturerSettings}
    this.messages();
  }

  ngOnInit(): void {
  }

  messages(): void{

    this.postErrorFind = false;
    this.postSuccessFind = false;

    this.postSuccess = false;
    this.postError = false;

    this.onTrue = false;

    this.retypepassword = '';
  }
}
