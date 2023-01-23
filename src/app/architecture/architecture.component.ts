import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.css']
})
export class ArchitectureComponent implements OnInit{
  isShowDiv: boolean = false;
  isUser: boolean = false;
  User: boolean = false;
  user: any = '';
  Type: string | null = '';

  constructor(private router: Router, private storageService: StorageService){}

  clickEvent(){
    this.isShowDiv = !this.isShowDiv;
  }

  ngOnInit(): void {
    this.User = this.storageService.isLoggedIn();
    if(this.User == false){
      this.isUser = false;
      this.router.navigate(['/login'])
    }
    else if(this.User == true){
      this.isUser = true;
      this.user = this.storageService.getUser();
      this.Type = this.user.type;
      this.router.navigate(['/register/student']);
    }
  }

  logOut(): void {
    this.storageService.logOut();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
