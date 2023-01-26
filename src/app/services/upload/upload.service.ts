import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  postFiles(urls: File): any {
    return this.http.post('http://localhost:5500/api/upload/create',urls);
  }
}
