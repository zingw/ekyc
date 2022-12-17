import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = 'http://localhost:8080/api/kyc';

  constructor(private http: HttpClient) {}

  upload(files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('frontImg', files[0], files[0].name);
    formData.append('backImg', files[1], files[1].name);
    formData.append('imgWithUser', files[2], files[2].name);
    return this.http.post<any>(this.baseUrl + '/verify-customer', formData, { observe: 'response' });
  }
}
