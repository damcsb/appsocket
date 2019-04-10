import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class Service{
  
  login(http: HttpClient, apiUrl: string, email: string, password: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body: any = { email, password };
    return new Promise((resolve, reject) => {
        http.patch(apiUrl + '/public/login', body, { headers }).subscribe((pData: any) => resolve(pData.data), err => reject(err));
    });
  }
}