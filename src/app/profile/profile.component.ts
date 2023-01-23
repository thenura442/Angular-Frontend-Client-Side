import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../services/registration/registration.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private register:RegistrationService, private storageService: StorageService){}

  postSuccess = false;
  postSuccessMessage = "";
  postError = false;
  postErrorMessage = "";

  onTrue = false;
  date: any;
  formdate = "";
  password2: string = "";
  retypepassword: string = this.password2;
  dob!: Date;
  user: any = {}

  orginalUserSettings: any = {
    _id: "",
    name: "",
    email: "",
    password: "thenura1",
    nic: "200308300020",
    dob: "2021/03/23",
    mobile_no: "0783323261",
    address: "272,10c-1,subhamawatha,nugegoda",
    landline_no: "0112821161",
    dle_access: "open",
    url: "http://localhost:5500/api/user/register",
    type: "student"
  }

  userSettings: any = {...this.orginalUserSettings}

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }


  onUpdate(form: NgForm){
    console.log("in on submit "+ form.valid);
    console.log(this.userSettings.password)
    console.log(this.password2)
    if(form.valid && this.userSettings.password === this.retypepassword){
      this.messages();
      this.register.updateBody(this.userSettings).subscribe((result) => {
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
          this.userSettings = {...this.orginalUserSettings}
          this.findUser(this.body);
        }
      });
    }
  }

  messages(): void{

    this.postSuccess = false;
    this.postError = false;

    this.onTrue = false;
  }

  orginalBody: any = {
    _id: '',
    type: ''
  }

  body: any = {...this.orginalBody}


  ngOnInit(): void {
    this.user = this.storageService.getUser()
    this.body.type = this.user.type;
    this.body._id = this.user._id;
    this.findUser(this.body);
  }

  findUser(body: any): any {
    this.register.findId(body).subscribe((result: any) => {
      if(result == null) {
        this.postErrorMessage = "ID not Found!";
        this.postError= true;
        this.postSuccess = false;
        console.log(result);
      }
      else{
        this.userSettings = result;
        this.postError = false;
        this.postSuccess = true;
        this.postSuccessMessage = "Welcome "+ result.type + ' '+result._id +'!';
        this.onTrue = true;

        this.retypepassword = result.password;
      }
    })
  }
}
