import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/authService';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  profileImage = '';
  profileImages: {name: string, path: string}[] = [];
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfileImages();
  }

  loadProfileImages(): void {
    this.profileImages = [
      { name: 'Alvin', path: 'assets/images/alvin.jpeg' },
      { name: 'Simon', path: 'assets/images/simon.jpeg' },
      { name: 'Theodore', path: 'assets/images/theodore.jpeg' },
    ];
  }

  async onSubmit(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
  
    // Validações básicas
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Todos os campos são obrigatórios.';
      this.isLoading = false;
      return;
    }
  
    // Verifica formato básico do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'E-mail inválido.';
      this.isLoading = false;
      return;
    }
  
    // Verifica tamanho da senha
    if (this.password.length < 6) {
      this.errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      this.isLoading = false;
      return;
    }
  
    try {
      await this.authService.register({
        name: this.name,
        email: this.email,
        password: this.password,
        profileImageUrl: this.profileImage || null,
      }).toPromise();
  
      // Registro bem-sucedido → redireciona
      this.router.navigate(['/login']);
    } catch (error: any) {
      if (error.error && error.error.message) {
        this.errorMessage = error.error.message; 
      } else {
        this.errorMessage = 'Erro ao registrar. Tente novamente.';
      }
    } finally {
      this.isLoading = false;
    }
  }
}