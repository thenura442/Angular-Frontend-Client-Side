import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-client-error',
  templateUrl: './client-error.component.html',
  styleUrls: ['./client-error.component.css']
})
export class ClientErrorComponent implements AfterViewInit {


  constructor(private router:Router, private storageService: StorageService, private elementRef: ElementRef){}

  backLogin():void {
    this.storageService.logOut();
    this.router.navigate(['/login']);

  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = 'white';
  }

  reloadPage(): void {
    window.location.reload();
  }
}
