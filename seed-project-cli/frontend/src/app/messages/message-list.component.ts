import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageComponentSignal } from "./message-signal.component";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Router } from '@angular/router';



@Component({
    selector: 'app-message-list',
    standalone: true,
    imports: [FormsModule, MessageComponentSignal],
    template: `<div class="col-md-8 col-md-offset-2">
                @for (msg of messageS; track $index){
                <app-message-signal [messageVarClasse]="msg"    
                                    (outputMessage)="msg.content =$event">
                </app-message-signal>
                }@empty{
                    vazio
                }
                </div>`,
   // providers: [MessageService]
})
export class MessageListComponent implements OnInit{
    messageS: Message[] = [];
    //private messagesSub!: Subscription; //teste
    constructor(private messageService: MessageService, private authService: AuthService, private router: Router){}
   //ngOnInit(): void {
   //    this.messageS = this.messageService.getMessages();
  // }
   
   ngOnInit() {

    if(!this.authService.isLoggedIn()){
      alert("Você precisa estar logado para acessar esta página.");
      this.router.navigate(['/autenticacao']);
      return;
    }
    
    this.messageService.getMessages().subscribe({
      next: (dadosSucesso: any) => {
        console.log(dadosSucesso.myMsgSucesso);


      this.messageS = dadosSucesso.objSMessageSRecuperadoS;
      },
      error: (dadosErro) => {
        console.log(`$== !!Error (subscribe): -${dadosErro.info_extra}==`);
        console.log(dadosErro);
      }
    });
    this.messageService.getMessagesUpdateListener()
    .subscribe((messages: Message[]) => {
        this.messageS = messages;
    });
    
}


  
}