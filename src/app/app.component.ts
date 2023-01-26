import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-Frontend-Client-Side';


  constructor(private storageService:StorageService, private route: Router){}

  ngOnInit(): void {
    this.route.navigate(['/login'])
  }
}
