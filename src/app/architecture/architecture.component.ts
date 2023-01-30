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
  user: any = '';
  Type: string | null = '';

  constructor(private router: Router, private storageService: StorageService, private elementRef: ElementRef){}

  clickEvent(){
    this.isShowDiv = !this.isShowDiv;
  }

  ngOnInit(): void {
    this.User = this.storageService.isLoggedIn();
    if(this.User == true){
      this.isUser = true;
      this.user = this.storageService.getUser();
      this.Type = this.user.type;
      this.router.navigate(['/home']);
    }
  }

  logOut(): void {
    this.storageService.logOut();
    this.storageService.clean();
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
