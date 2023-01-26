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

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'architecture', component: ArchitectureComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'assignment', component: AssignmentsComponent},
  { path: 'register/subject', component: SubjectComponent},
  { path: 'subject/:id', component: SubjectPageComponent},
  { path: 'register/student', component: StudentRegistrationComponent}
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
