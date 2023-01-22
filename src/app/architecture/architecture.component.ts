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
  user?: string | null;
  isUser: boolean = false;

  constructor(private router: Router, private storageService: StorageService){}

  clickEvent(){
    this.isShowDiv = !this.isShowDiv;
  }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    if(this.user === null){
      this.isUser = true;
      this.router.navigate(['/login'])
    }
    else {
      this.isUser = false;
    }
  }
}
