import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements AfterViewInit{
  constructor(private router:Router, private storageService: StorageService, private elementRef:ElementRef){}

  backHome():void {
    this.router.navigate(['/home']);
  }

  backLogin():void {
    this.storageService.logOut();
    this.router.navigate(['/home']);
    this.reloadPage();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = 'white';
  }

  reloadPage(): void {
    window.location.reload();
  }
}
