import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentRegistrationComponent } from './register/student-registration/student-registration.component';

import { HttpInterceptorProviders } from './services/httpInterceptor/http.interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { ArchitectureComponent } from './architecture/architecture.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentRegistrationComponent,
    ArchitectureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
