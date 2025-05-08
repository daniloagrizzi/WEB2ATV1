import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/authService';
import { MessageService } from '../../Services/messageService'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],

  template: `
    <div class="home-container">
      <header>
        <div class="user-info">
          <img [src]="user?.profileImageUrl || 'default-avatar.png'" alt="User Avatar" class="user-avatar" />
          <h1>Bem-vindo, {{ user?.name || 'Usuário' }}</h1>
        </div>
        <p>Você é um otário!</p>
      </header>

      <!-- Exibição das mensagens -->
      <section class="messages-list">
        <h2>Mensagens</h2>
        <div *ngIf="messages.length === 0">
          <p>Nenhuma mensagem.</p>
        </div>
       <div *ngFor="let message of messages" class="message-card">
  <img [src]="message.user.profileImageUrl || 'default-avatar.png'" alt="Profile" class="message-avatar" />
  <div class="message-content">
    <h4 class="user-name">{{ message.user.name }}</h4>
    <p class="message-text">{{ message.text }}</p>
    <small class="message-date">{{ message.createdAt | date:'short' }}</small>
  </div>
  <div class="actions" *ngIf="user?._id === message.user._id">
    <button (click)="onEdit(message)" class="edit-btn">Editar</button>
    <button (click)="onDelete(message)" class="delete-btn">Excluir</button>
  </div>
</div>

      </section>
<!-- Envio de nova mensagem -->
<section class="new-message">
  <h3>Enviar nova mensagem</h3>
  <form (ngSubmit)="sendMessage()">
    <textarea 
      class="message-input"
      name="message"
      [(ngModel)]="newMessageText"
      rows="3"
      placeholder="Digite sua mensagem..."
      required>
    </textarea>

    <div class="form-actions">
      <button class="btn primary" type="submit">Enviar</button>
    </div>
  </form>
</section>

      <footer>
        <button class="btn danger" (click)="logout()">Sair</button>
      </footer>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }

    header h1 {
      font-size: 2rem;
      color: #333;
      margin: 0;
    }

    .messages-list {
      margin-top: 2rem;
    }

    .message-card {
      background-color: #f9f9f9;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .message-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }

    .message-input {
      width: 100%;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 1rem;
      margin-bottom: 1.5rem;
      resize: none;
    }

    .form-actions {
      display: flex;
      justify-content: center;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #e0e0e0;
      transition: background-color 0.3s;
    }

    .btn:hover {
      background-color: #d0d0d0;
    }

    .btn.primary {
      background-color: #1976d2;
      color: white;
    }

    .btn.primary:hover {
      background-color: #1565c0;
    }

    .btn.danger {
      background-color: #f44336;
      color: white;
    }

    .btn.danger:hover {
      background-color: #e53935;
    }

    footer {
      margin-top: 3rem;
      display: flex;
      justify-content: center;
    }
      .actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.edit-btn, .delete-btn {
  padding: 0.3rem 0.7rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.edit-btn {
  background-color: #ffc107;
  color: #000;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

  `]
})
export class HomeComponent implements OnInit {
  user: any;
  messages: any[] = [];
  newMessageText: string = '';

  constructor(private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    console.log('Home component initialized');
    
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
  
        if (this.user && this.user.id && !this.user._id) {
          this.user._id = this.user.id;
          delete this.user.id; 
        }
  
        if (!this.user._id) {
          console.warn("Usuário carregado, mas sem _id:", this.user);
        }
      } catch (err) {
        console.error("Erro ao fazer parse do usuário:", err);
      }
    } else {
      console.warn("Nenhum usuário encontrado no localStorage");
    }
  
    this.loadMessages();
  }
  

  loadMessages(): void {
    this.messageService.getAllMessages().subscribe(
      (data: any[]) => {
        this.messages = data;
      },
      (error) => {
        console.error('Erro ao carregar mensagens', error);
      }
    );
  }
  sendMessage(): void {
    console.log('Form enviado'); 
  
    const message = this.newMessageText.trim();
    const userId = this.user?._id;
  
    if (!message) {
      console.warn('Mensagem vazia');
      return;
    }
  
    if (!userId) {
      console.error('Usuário não autenticado');
      alert('Usuário não autenticado. Faça login novamente.');
      this.authService.logout();
      return;
    }
  
    console.log('Enviando mensagem:', message);
    console.log('ID do usuário:', userId);
  
    this.messageService.createMessage(message, userId).subscribe({
      next: (res) => {
        console.log('Mensagem enviada com sucesso:', res);
        this.newMessageText = '';
        this.loadMessages();
      },
      error: (err) => {
        console.error('Erro ao enviar mensagem', err);
        
        let errorMsg = 'Erro ao enviar mensagem. ';
        
        if (err.status === 0) {
          errorMsg += 'Servidor não está respondendo ou há um problema com CORS. Verifique a conexão.';
        } else if (err.status === 401) {
          errorMsg += 'Sessão expirada. Faça login novamente.';
          this.authService.logout();
        } else {
          errorMsg += `Erro: ${err.status}. Detalhes no console.`;
        }
        
        alert(errorMsg);
      }
    });
  }
  
  logout(): void {
    this.authService.logout();
    console.log('Logout clicked');
  }

  onEdit(message: any): void {
    const novoTexto = prompt("Editar mensagem:", message.text);
    if (novoTexto !== null && novoTexto.trim() !== '') {
      this.messageService.editMessage(message._id, novoTexto.trim()).subscribe({
        next: () => this.loadMessages(),
        error: (err: any) => {
          console.error('Erro ao editar mensagem', err);
        }
        
      });
    }
  }
  
  onDelete(message: any): void {
    const confirmar = confirm("Tem certeza que deseja excluir esta mensagem?");
    if (confirmar) {
      this.messageService.deleteMessage(message._id).subscribe({
        next: () => this.loadMessages(),
        error: (err) => {
          console.error("Erro ao excluir mensagem", err);
          alert("Erro ao excluir a mensagem.");
        }
      });
    }
  }  
}
