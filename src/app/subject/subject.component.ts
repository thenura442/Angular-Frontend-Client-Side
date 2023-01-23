import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from '../interfaces/subject';
import { SubjectService } from '../services/subject/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor(private subjectService: SubjectService){}

  postErrorFind = false;
  postErrorMessageFind = "";
  postSuccessFind = false;
  postSuccessMessageFind = "";

  postSuccess = false;
  postSuccessMessage = "false";
  postError = false;
  postErrorMessage = "";

  onTrue = false;

  orginalSubjectSettings: Subject = {
    _id: "",
    name: "",
    description: "",
    lecturer_id: "",
    grade: "",
    url: "Stringgag/agsgag"
  }

  subjectSettings: Subject = {...this.orginalSubjectSettings}

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }


  onSubmit(form: NgForm) {
    console.log('in on submit : '+ form.valid);
    if(form.valid && this.subjectSettings.grade != 'Select Grade') {
      this.messages();
      this.subjectService.postSubjectForm(this.subjectSettings).subscribe((result: any) => {
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
        }
      });
    }
  }

  orginalBody : any = {
    _id: ''
  }

  body : any = {...this.orginalBody}

  onFind(search: NgForm){
    console.log("in on submit "+ search.valid);
    console.log(this.body._id);
    if(search.valid ){
      this.messages();

      this.subjectService.findId(this.body).subscribe((result : any) => {
        if(result == null) {
          this.postErrorMessageFind = "ID not Found!";
          this.postErrorFind = true;
          this.postSuccessFind = false;
          console.log(result);
        }
        else{
          this.subjectSettings = result;
          this.postErrorFind = false;
          this.postSuccessFind = true;
          this.postSuccessMessageFind = "Found ID "+ result._id ;
          this.onTrue = true;

          console.log(result);
        }
      })
    }
  }

  onUpdate(form: NgForm){
    console.log("in on submit "+ form.valid);
    if(form.valid && this.subjectSettings.grade != 'Select Grade' ){
      this.messages();
      this.subjectService.updateSubject(this.subjectSettings).subscribe((result) => {
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
          this.subjectSettings = {...this.orginalSubjectSettings}
        }
      });
    }
  }

  onDelete(form: NgForm){
    console.log("in on submit "+ form.valid);
    if(form.valid){
      this.messages();
      this.subjectService.deleteSubject(this.subjectSettings).subscribe((result) => {
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
          this.postSuccessMessage = this.subjectSettings._id+ " Deleted Successfully!"
          this.subjectSettings = {...this.orginalSubjectSettings}
        }
      });
    }
  }


  // isShowDiv: boolean = false;

  // clickEvent(){
  //   this.isShowDiv = !this.isShowDiv;
  // }

  ngOnInit(): void {
  }

  messages(): void{

    this.postErrorFind = false;
    this.postSuccessFind = false;

    this.postSuccess = false;
    this.postError = false;

    this.onTrue = false;
  }
}
