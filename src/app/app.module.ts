import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentRegistrationComponent } from './register/student-registration/student-registration.component';


import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { SubjectComponent } from './subject/subject.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { SubjectPageComponent } from './subject-page/subject-page.component';
import { LecturerRegistrationComponent } from './register/lecturer-registration/lecturer-registration.component';
import { StaffRegistrationComponent } from './register/staff-registration/staff-registration.component';
import { HomeComponent } from './home/home.component';
import { OrderByPipe } from './_custom_pipes/orderby/order-by.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpInterceptorProviders } from './_interceptors/error-catching/error-catching.interceptor';
import { BlockedComponent } from './blocked/blocked.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RoomComponent } from './room/room.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentRegistrationComponent,
    ProfileComponent,
    DashboardComponent,
    SubjectComponent,
    AssignmentsComponent,
    SubjectPageComponent,
    LecturerRegistrationComponent,
    StaffRegistrationComponent,
    HomeComponent,
    OrderByPipe,
    PageNotFoundComponent,
    BlockedComponent,
    UnauthorizedComponent,
    RoomComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
