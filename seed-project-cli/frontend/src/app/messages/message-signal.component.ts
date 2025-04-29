import { Component, input,Output,EventEmitter,inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Message } from "./message.model";
import { CommonModule } from "@angular/common";
import { MessageService } from "./message.service";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-message-signal',
    standalone: true,
    imports: [FormsModule,CommonModule],
    templateUrl: './message-signal.component.html',
    styleUrl: './message.component.css'
})
export class MessageComponentSignal{
    messageVarClasse = input<Message>(new Message("",""));
     @Output() outputMessage = new EventEmitter<string>();
    //constructor(private messageServiceObj: MessageService){}
    private messageService = inject(MessageService);
    private authService = inject(AuthService);

    /*onEdit(){
                //alert('ta funfando');
     this.outputMessage.emit("Texto retorando com signal: venho de message (child) para o app (pai)")
            }
*/
isLoggedIn = false;
userName = '';
isEditing = false;
editContent = '';
ngOnInit() {
  const user = localStorage.getItem('user');
  if (user) {
    this.isLoggedIn = true;
    const userObj = JSON.parse(user);
    this.userName = userObj.firstName + ' ' + userObj.lastName;
  }
}

onEditClick() {
  this.isEditing = true;
  this.editContent = this.messageVarClasse().content; 
}

onSaveEdit() {
  if (!this.messageVarClasse()?.messageId) return;

  this.messageVarClasse().content = this.editContent;

  this.messageService.updateMessage(this.messageVarClasse()).subscribe({
    next: (res) => {
      console.log(res.myMsgSucesso);
      this.isEditing = false; 
    },
    error: (err) => {
      console.error("Erro ao editar mensagem", err);
    }
  });
}
onCancelEdit(){
  this.isEditing = false;
}

    onDelete(message: Message){ 
          console.log("Botão delete clicado", message);
          if (!message.messageId) {
            console.error("Mensagem não possui messageId");
            return;
        }
          
            this.messageService.deleteMessage(message).subscribe({
              next: (response) => {
                console.log('Mensagem excluída com sucesso:', response);                
              },
              error: (err) => {
                console.error('Erro ao excluir a mensagem:', err);
              }
            });}
}