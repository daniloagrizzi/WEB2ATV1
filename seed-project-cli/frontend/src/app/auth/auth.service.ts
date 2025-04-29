import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser = signal<any>(null); 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage(); 
  }

  private loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) this._currentUser.set(JSON.parse(user));
  }

  currentUser() {
    return this._currentUser();
  }

 
  isLoggedIn() {
    return !!this._currentUser();
  }


  signin(email: string, password: string) {
    return this.http.post<any>('/api/autenticacao/signin', { email, password }).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this._currentUser.set(res.user);
        this.router.navigate(['/mensagens']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
      }
    });
  }

  
  logout() {
    localStorage.removeItem('user');
    this._currentUser.set(null);
    this.router.navigate(['/autenticacao/signin']);
  }
}