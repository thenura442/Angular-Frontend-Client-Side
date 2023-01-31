import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-error',
  templateUrl: './client-error.component.html',
  styleUrls: ['./client-error.component.css']
})
export class ClientErrorComponent implements AfterViewInit {


  constructor(private router:Router, private elementRef: ElementRef){}

  backHome():void {
    this.router.navigate(['/home']);

  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = 'white';
  }

  reloadPage(): void {
    window.location.reload();
  }
}
