import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { StudentRegistrationComponent } from './register/student-registration/student-registration.component';
import { ArchitectureComponent } from './architecture/architecture.component';
import { ProfileComponent } from './profile/profile.component';
import { SubjectComponent } from './subject/subject.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { SubjectPageComponent } from './subject-page/subject-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { LecturerRegistrationComponent } from './register/lecturer-registration/lecturer-registration.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'architecture', component: ArchitectureComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'assignment', component: AssignmentsComponent, canActivate: [AuthGuard]},
  { path: 'register/subject', component: SubjectComponent, canActivate: [AuthGuard]},
  { path: 'register/employee', component: LecturerRegistrationComponent, canActivate: [AuthGuard]},
  { path: 'register/student', component: StudentRegistrationComponent, canActivate: [AuthGuard]},
  { path: 'subject/:id', component: SubjectPageComponent, canActivate: [AuthGuard]},

  //{ path: '',   redirectTo: '/login', pathMatch: 'full' }
  //{ path: '**', component: PageNotFoundComponent }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
