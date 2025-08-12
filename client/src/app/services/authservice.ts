import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AuthResponse } from '../interfaces/AuthResponse';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5094';
  private _token = signal<string | null >(null);
  public isLoggedIn = signal(false);

  constructor(private http: HttpClient, private router: Router)
  {
    const saved = localStorage.getItem('token');
     if (saved) {
        this._token.set(saved);
        this.isLoggedIn.set(true);
      } 
  }

  login(email: string, password: string)
  {
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/Auth/login`,{email,password}).pipe(
    tap(res => {
      localStorage.setItem('token', res.token); // Save token
      localStorage.setItem('username', email);  // Save username/email after success
    })
  );

  }

   setToken(token:string)
  {
    this._token.set(token);
    localStorage.setItem('token',token);
     this.isLoggedIn.set(true);
  }

   logout()
  {
     this._token.set(null);
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);

  }

   getToken()
  {
      return this._token();

  }


 
}
