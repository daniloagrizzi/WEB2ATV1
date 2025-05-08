import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './authService';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'https://3000-firebase-approsalengit-1746666134793.cluster-m7tpz3bmgjgoqrktlvd4ykrc2m.cloudworkstations.dev/api/messages';
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  createMessage(text: string, userId: string): Observable<any> {
    console.log('Sending message to:', `${this.apiUrl}/create`);
    console.log('Message data:', { text, userId });
    
    return this.http.post(
      `${this.apiUrl}/create`,
      { text, userId },
      {
        withCredentials: true,
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'json',
      }
    ).pipe(
      catchError(error => {
        console.error('Erro ao enviar mensagem:', error);
        // Add more detailed error logging
        if (error.error instanceof Error) {
          console.error('Client-side error:', error.error.message);
        } else {
          console.error('Server response:', error.status, error.error);
        }
        return throwError(() => error);
      })
    );
  }
  
  // Listar todas as mensagens
  getAllMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`, {
      withCredentials: true,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json',
    }).pipe(
      catchError(error => {
        console.error('Erro ao buscar mensagens:', error);
        return throwError(() => error);
      })
    );
  }

  // Editar uma mensagem
  editMessage(messageId: string, text: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/edit/${messageId}`,
      { text },
      {
        withCredentials: true,
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'json',
      }
    ).pipe(
      catchError(error => {
        console.error('Erro ao editar mensagem:', error);
        return throwError(() => error);
      })
    );
  }

  // Deletar uma mensagem
  deleteMessage(messageId: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/delete/${messageId}`,
      {
        withCredentials: true,
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'json',
      }
    ).pipe(
      catchError(error => {
        console.error('Erro ao deletar mensagem:', error);
        return throwError(() => error);
      })
    );
  }
}