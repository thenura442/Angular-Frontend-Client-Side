import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//const URL = 'http://localhost:5500/';
const URL = 'https://cmc-dle-backend.onrender.com/';
const PATH = 'api/upload/';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  postFiles(urls: File): any {
    return this.http.post(URL+PATH+'create',urls);
  }
}
