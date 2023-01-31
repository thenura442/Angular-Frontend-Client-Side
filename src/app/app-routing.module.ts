import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { StudentRegistrationComponent } from './register/student-registration/student-registration.component';
import { ProfileComponent } from './profile/profile.component';
import { SubjectComponent } from './subject/subject.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { SubjectPageComponent } from './subject-page/subject-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth/auth.guard';
import { LecturerRegistrationComponent } from './register/lecturer-registration/lecturer-registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClientErrorComponent } from './client-error/client-error.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { BlockedComponent } from './blocked/blocked.component';
import { BlockedGuard } from './_guards/blocked/blocked.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { StaffGuard } from './_guards/staff/staff.guard';
import { AdminGuard } from './_guards/admin/admin.guard';
import { StudentGuard } from './_guards/student/student.guard';
import { LecturerGuard } from './_guards/lecturer/lecturer.guard';
import { RoomComponent } from './room/room.component';
import { ChatComponent } from './chat/chat.component';
import { ChatGuard } from './_guards/chat/chat.guard';

const appRoutes: Routes = [
  { path: 'home',   component: HomeComponent , canActivate: [AuthGuard, BlockedGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard, BlockedGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, BlockedGuard, StudentGuard]},
  { path: 'assignment', component: AssignmentsComponent, canActivate: [AuthGuard, BlockedGuard, LecturerGuard]},
  { path: 'register/subject', component: SubjectComponent, canActivate: [AuthGuard, BlockedGuard, StaffGuard]},
  { path: 'register/employee', component: LecturerRegistrationComponent, canActivate: [AuthGuard, BlockedGuard, AdminGuard]},
  { path: 'register/student', component: StudentRegistrationComponent, canActivate: [AuthGuard, BlockedGuard, StaffGuard]},
  { path: 'dashboard/:id', component: SubjectPageComponent, canActivate: [AuthGuard, BlockedGuard, StudentGuard]},
  { path: 'room', component: RoomComponent, canActivate: [AuthGuard, BlockedGuard, ChatGuard]},
  { path: 'room/:id', component: ChatComponent, canActivate: [AuthGuard, BlockedGuard, ChatGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'blocked', component: BlockedComponent, canActivate: [AuthGuard]},
  { path: 'unauthorized', component: UnauthorizedComponent, canActivate: [AuthGuard, BlockedGuard]},
  { path: 'client-error', component: ClientErrorComponent, canActivate: [AuthGuard, BlockedGuard]},
  { path: 'server-error', component: ServerErrorComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
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
