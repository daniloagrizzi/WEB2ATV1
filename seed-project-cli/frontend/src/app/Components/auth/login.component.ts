import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/authService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };
  
  isLoading = false;
  errorMessage = '';
  isRegisterMode = false;
  constructor(private router: Router, private authService: AuthService) { }
  
  ngOnInit(): void {
   // this.authService.isAuthenticated() && this.router.navigate(['/home']);
  }
  
  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
  
    // Validação básica
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      this.isLoading = false;
      return;
    }
  
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido, salvando usuário:', response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log('user no localStorage:', localStorage.getItem('user'));
        this.router.navigate(['/home']);
      },
      
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Usuário não encontrado.';
        } else if (error.status === 400) {
          this.errorMessage = 'Senha incorreta.';
        } else {
          this.errorMessage = 'Erro ao fazer login. Tente novamente.';
        }
        this.isLoading = false; // garante que pare mesmo em erro
      }
    });
  }
}

