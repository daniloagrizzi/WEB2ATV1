import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap((res: any) => {
          if (res?.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
          } else {
            console.warn('Resposta da API não contém "user":', res);
          }
        })
      );
  }
  

  register(userData: any) {
    return this.http.post('/api/auth/register', userData);
  }
   

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isAuthenticated(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '');
      return user && user._id != null;
    } catch {
      return false;
    }
  }  
}
