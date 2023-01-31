import {AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUser } from '../_interfaces/login-user';
import { StorageService } from '../services/storage/storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {


  constructor( private storageService: StorageService, private route: ActivatedRoute, private router: Router, private location: Location, private elementRef : ElementRef){
    if (this.storageService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  originalLoginForm: LoginUser = {
    email: "",
    password: "",
    type: "staff"
  };

  loginForm: LoginUser = {...this.originalLoginForm}

  userStaff = false;
  loginType = "staff";
  postError = false;
  postErrorMessage = "";
  returnUrl: string = '' ;

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }


  body: any = {}

  onSubmit(form : NgForm): void {
    console.log('in on submit : '+ form.valid);
    if(form.valid) {
      this.postError = false;
      //console.log(this.loginForm)
      this.storageService.login(this.loginForm).subscribe((result) => {
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
          // const _id = Object.getOwnPropertyDescriptor(result, '_id');
          // const email = Object.getOwnPropertyDescriptor(result, 'email');
          // const type = Object.getOwnPropertyDescriptor(result, 'type');
          // const grade = Object.getOwnPropertyDescriptor(result, 'grade');

          // let body = { _id:_id?.value , email:email?.value , type:type?.value, grade: grade?.value }
          // this.storageService.saveUser(body);
          // console.log(body);
          this.postError = false;
          let user = this.storageService.getUser();
          if(user.dle_access == 'blocked'){
            this.router.navigate(['/blocked'])
          }
          this.router.navigate(['/home']);

          //console.log(result)
          // this.storageService.saveUser(result);

          // this.isLoginFailed = false;
          // this.isLoggedIn = true;
          // this.roles = this.storageService.getUser().roles;
          // this.reloadPage();
        }
      });
    }
    else{
      this.onHttpError("Please Enter all Required Fields with Valid Values");
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    this.loginForm.type = "student";
    this.storageService.currentData.subscribe(dataSub => {
      let user = dataSub;
      if(user != null){
        console.log(user)
        this.router.navigate(['/home']);
      }
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = '#101820FF';
  }

  back(): void {
    this.location.back()
  }

  userType(): void{
    if(this.userStaff == false){
      this.userStaff = true;
      this.loginForm.type = "staff"
      this.loginType = "student";
      console.log(this.loginForm.type)
    }
    else{
      this.userStaff = false;
      this.loginForm.type = "student"
      this.loginType = "staff";
      console.log(this.loginForm.type)
    }
  }
}


// {
//   next: data => {
//     this.storageService.saveUser(data);

//     this.isLoginFailed = false;
//     this.isLoggedIn = true;
//     this.roles = this.storageService.getUser().roles;
//     this.reloadPage();
//   },
//   error: err => {
//     this.errorMessage = err.error.message;
//     this.isLoginFailed = true;
//   }
// }
