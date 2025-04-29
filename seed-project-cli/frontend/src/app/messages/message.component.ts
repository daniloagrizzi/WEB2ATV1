import { Component, EventEmitter, Input, Output,inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
@Component({
    selector: 'app-message',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './message.component.html',
    styleUrl: './message.component.css'
})
export class MessageComponent{
        private messageService = inject(MessageService);

        @Input() messageVarClasse: Message = new Message("","");

        @Output() outputMessage = new EventEmitter<string>();

        onEdit(){
            //alert('ta funfando');
            this.outputMessage.emit("Texto retorando: venho de message (child) para o app (pai)")
        }
        onDelete(message: Message){ 
          console.log("Botão delete clicado", message);
          if (!message.messageId) {
            console.error("Mensagem não possui messageId");
            return;
        }
             event?.preventDefault();
            this.messageService.deleteMessage(message).subscribe({
              next: (response) => {
                console.log('Mensagem excluída com sucesso:', response);
                
                
              },
              error: (err) => {
                console.error('Erro ao excluir a mensagem:', err);
              }
            });}

 //   message ={
     //   content: 'To ficando fera com vários componenets',
   //     author: 'matheus'
   // };
}