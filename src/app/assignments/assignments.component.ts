import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Assignment } from '../_interfaces/assignment';
import { AssignmentsService } from '../services/assignment/assignments.service';
import { StorageService } from '../services/storage/storage.service';
import { SubjectService } from '../services/subject/subject.service';
import { UploadService } from '../services/upload/upload.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent {


  constructor(private assignmentService: AssignmentsService, private storageService: StorageService, private subjectService: SubjectService , private uploadService: UploadService){}

  isFiles: boolean = false;

  postErrorFind = false;
  postErrorMessageFind = "";
  postSuccessFind = false;
  postSuccessMessageFind = "";

  postSuccess = false;
  postSuccessMessage = "false";
  postError = false;
  postErrorMessage = "";

  onTrue = false;
  updateTrue = false;
  subjects: any[] = [];
  urls: any[] = [];

  filesToUpload: Array<File> = [];

  orginalAssignmentSettings: Assignment = {
    id: "",
    title: "",
    description: "",
    subject: "",
    url: ''
  }

  assignmentSettings: Assignment = {...this.orginalAssignmentSettings}

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }


  onSubmit(form: NgForm) {
    this.messages();
    console.log('in on submit : '+ form.valid);
    if(form.valid && this.assignmentSettings.subject != 'Select Subject') {
      this.messages();
      this.assignmentService.postAssignmentForm(this.assignmentSettings).subscribe((result: any) => {
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
          this.postSuccessMessage = "Operation Successful with ID - " + result.id;
        }
      });
    }
  }

  orginalBody : any = {
    id: '',
    subject: ''
  }

  body : any = {...this.orginalBody}

  onFind(Search_ID: NgForm, Search_Subject: NgForm){
    console.log(Search_ID)
    console.log(Search_Subject)
    this.onTrue = false;
    console.log("in on submit "+ Search_ID.valid);
    console.log("in on submit "+ Search_Subject.valid);
    console.log(this.body.id);
    console.log(this.body.subject);
    console.log(this.body);
    if(Search_ID.valid && Search_Subject.valid){
      this.messages();

      this.assignmentService.findId(this.body).subscribe((result : any) => {
        if(result == null) {
          this.postErrorMessageFind = "ID not Found!";
          this.postErrorFind = true;
          this.postSuccessFind = false;
          console.log(result);
        }
        else{
          this.assignmentSettings = result;
          this.postErrorFind = false;
          this.postSuccessFind = true;
          this.postSuccessMessageFind = "Found ID "+ result.id ;
          this.onTrue = true;
          this.updateTrue = true;

          console.log(result);
        }
      })
    }
  }

  onUpdate(form: NgForm){
    console.log("in on submit "+ form.valid);
    if(form.valid){
      this.messages();
      this.assignmentService.updateAssignment(this.assignmentSettings).subscribe((result) => {
        console.log(result);
        if (Object.hasOwn(result, 'Error')) {
          const status = Object.getOwnPropertyDescriptor(result, 'Status');
          const error = Object.getOwnPropertyDescriptor(result, 'Error');

          if (status?.value === "400") {
            this.onHttpError(error?.value);
          }
          else {
            this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
            console.log(result);
          }
        }
        else {
          this.postError = false;
          this.postSuccess = true;
          this.postSuccessMessage = "Update Successful on ID - " + result.id;
          this.assignmentSettings = { ...this.orginalAssignmentSettings };
          this.updateTrue = false;
        }
      });
    }
  }

  onDelete(form: NgForm){
    console.log("in on submit "+ form.valid);
    if(form.valid){
      this.messages();
      this.assignmentService.deleteAssignment(this.assignmentSettings).subscribe((result : any) => {
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
          this.postSuccessMessage = this.assignmentSettings.subject+ " "+ this.assignmentSettings.id+ " Deleted Successfully!"
          this.assignmentSettings = {...this.orginalAssignmentSettings}
          this.updateTrue = false;
        }
      });
    }
  }


  uploadCreate(): any {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);
    for(let i =0; i < files.length; i++){
      formData.append("url", files[i], files[i]['name']);
    }
    this.uploadService.postFiles(formData).subscribe((result: any) => {
      console.log(result);
      this.urls = result;
      console.log(this.urls);
      this.assignmentSettings.url = this.urls;
    })

    this.assignmentSettings.url = this.urls;
    this.isFiles = true;
  }


  selectMultipleImage(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }




  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.subjectService.getLecturerSubjects({lecturer_id: user._id}).subscribe((result: any) => {
      if(result == null  || Object.hasOwn(result,'Error')){
        this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
        console.log(result)
      }
      else{
        this.subjects = result;
        console.log(result);
        console.log(result[0]._id)
      }
    })
  }

  messages(): void{

    this.postErrorFind = false;
    this.postSuccessFind = false;

    this.postSuccess = false;
    this.postError = false;

    this.onTrue = false;
  }
}
