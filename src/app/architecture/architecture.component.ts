import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.css']
})
export class ArchitectureComponent implements OnInit, AfterViewInit{
  isShowDiv: boolean = false;
  isUser: boolean = false;
  User: boolean = false;
  user: any ;
  Type: string | null = '';

  constructor(private router: Router, private storageService: StorageService, private elementRef: ElementRef){}

  clickEvent(){
    this.isShowDiv = !this.isShowDiv;
  }

  ngOnInit(): void {
    this.storageService.currentData.subscribe(dataSub => {
      let user = dataSub;
      this.user = dataSub;
      if(user != null){
        console.log(user)
        this.isUser = true;
        this.Type = user.type;
        this.router.navigate(['/home'])
      }
    })

  }

  logOut(): void {
    this.storageService.logOut();
    this.router.navigateByUrl("/login", { skipLocationChange: true });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = 'white';
  }

  reloadPage(): void {
    window.location.reload();
  }
}
