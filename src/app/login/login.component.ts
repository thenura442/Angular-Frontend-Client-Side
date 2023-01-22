import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '../interfaces/login-user';
import { LoginService } from '../services/login/login.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  originalLoginForm: LoginUser = {
    email: "",
    password: "",
    type: "student"
  };

  loginForm: LoginUser = {...this.originalLoginForm}

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  postError = false;
  postErrorMessage = "";

  constructor(private loginService: LoginService, private storageService: StorageService, private elementRef: ElementRef, private router: Router){}

  onHttpError(errorResponse:  any): void {
    console.log('error : ',errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse;
    console.log(this.postErrorMessage)
  }

  onSubmit(form : NgForm): void {
    console.log('in on submit : '+ form.valid);
    if(form.valid) {
      this.postError = false;
      this.loginService.login(this.loginForm).subscribe((result) => {
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
          const _id = Object.getOwnPropertyDescriptor(result, '_id');
          const email = Object.getOwnPropertyDescriptor(result, 'email');
          const type = Object.getOwnPropertyDescriptor(result, 'type');

          this.storageService.saveUser(_id?.value, email?.value, type?.value);
          let user = this.storageService.getUser();
          console.log(user)
          this.postError = false;
          this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
          this.router.navigate(['/register']);
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

  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = '#101820FF';
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
