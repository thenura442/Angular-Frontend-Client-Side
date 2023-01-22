import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { StudentRegistrationComponent } from './register/student-registration/student-registration.component';
import { ArchitectureComponent } from './architecture/architecture.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'architecture', component: ArchitectureComponent},
  { path: 'register', component: StudentRegistrationComponent}
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
