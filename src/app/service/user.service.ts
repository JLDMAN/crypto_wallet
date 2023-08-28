import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
  ){ 
  }

  registerUser(firstName: any, lastName: any, password: any, email: any): Observable<any>{
    
    const userData = {firstName, lastName, password, email};
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  loginUser(email: any, password: any){

    const userCredentials = {email, password};
    return this.http.post(`${this.apiUrl}/login`, userCredentials);
  }
}
