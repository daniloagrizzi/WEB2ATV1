import { inject, Injectable } from "@angular/core";
import { Message } from "./message.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, map, Subject, BehaviorSubject  } from "rxjs";
import { AuthService } from '../auth/auth.service'

@Injectable()
export class MessageService{
    private baseUrl = 'http://localhost:3000';
    private messageSService: Message[] = [];
    private authService = inject(AuthService);

    errorHandler(e: any, info: string): Observable<any>{
        throw({
            info_extra: info,
            error_SS: e,
            error_CS:"Client-Side: errorHandler: Ocorreu um erro!"
        })
    }

    private http = inject(HttpClient);

    private messagesUpdated = new BehaviorSubject<Message[]>([]); //teste agora
    getMessagesUpdateListener() {
      return this.messagesUpdated.asObservable();   //teste
  }
    

    addMessage(message: Message): Observable<any>{
      
      const user = this.authService.currentUser();
        console.log(this.messageSService);
        message.userId = user._id;
        message.username = user.firstName; 
        message.userImageUrl = user.imageUrl;
       // this.messageSService.push(message);


        /*return this.http.post<any>(`${this.baseUrl}/message`,message)*/
       return this.http.post<any>('/api/message', {
        content: message.content,
        user: message.userId,
      }).pipe(map((response: any) => {
        // TESTE LEMBRAR DE APAGAR
        this.getMessages().subscribe();
        return response;
      }),
    catchError((e) => this.errorHandler(e, "addMessage()"))
  );
    }
    deleteMessage(message: Message): Observable<any>{
        return this.http.delete<any>(`api/message/${message.messageId}`).pipe( map((response: any) => {
          // Após sucesso, buscar todas as mensagens atualizadas
          this.getMessages().subscribe();
          return response;
        }),
          
            catchError((e) => this.errorHandler(e, "deleteMessage()"))
          );
    }
   getMessages(): Observable<any>{
    return this.http.get<any>('/api/message').pipe(
      map((responseRecebida: any) => {
        console.log(responseRecebida);

        const messageSResponseRecebida = responseRecebida.objSMessageSRecuperadoS;
        let transformedCastMessagesModelFrontend: Message[] = [];
        for(let msg of messageSResponseRecebida){
          transformedCastMessagesModelFrontend.push(new Message(msg.content,msg.user ? msg.user.firstName : 'Usuário não encontrado',msg._id, msg.user?.imageUrl || 'assets/avatars/default-avatar.png', msg.user._id));

        }
        this.messageSService = [...transformedCastMessagesModelFrontend];
        responseRecebida.objSMessageSRecuperadoS = this.messageSService;

        this.messagesUpdated.next([...this.messageSService]);  //lembrar q é teste

        return responseRecebida;
      }),
      catchError((e) => this.errorHandler(e, "getMessages()"))
    );
   }
  updateMessage(message: Message): Observable<any> {
    return this.http.put<any>(`api/message/${message.messageId}`, { content: message.content }).pipe(
      catchError((e) => this.errorHandler(e, "updateMessage()"))
    );
  }
  
}
      
