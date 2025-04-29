import { Component, EventEmitter, Output,inject } from "@angular/core";
import { FormsModule,NgForm } from "@angular/forms";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service"; 
import { OnInit } from "@angular/core";

@Component({
    selector: "app-message-input",
    standalone: true,
    imports: [FormsModule],
    templateUrl: './message-input.component.html',
    styles: `input.ng-invalid.ng-touched{border: 1px solid red}`,
    styleUrl: './message-input.component.css'
    //providers: [MessageService]
})
export class MessageInputComponent implements OnInit{
    private messageService = inject(MessageService);
    private authService = inject(AuthService);
   userName = ''
   imageUser = ''
   
    ngOnInit(): void {
     if(this.authService.isLoggedIn())   
      this.userName =  this.authService.currentUser().firstName + ' ' + this.authService.currentUser().lastName;
        this.imageUser = this.authService.currentUser()?.imageUrl;
       }


    onSubmit(form: NgForm){
        console.log("MessageInputComponent: ")
        console.log(form);
        const messageAux = new Message(form.value.myContentngForm,'')
       /* const userLogado = JSON.parse(localStorage.getItem('userData') || '{}');
        const userId = userLogado?.userId;
        const messageAux = new Message(form.value.myContentngForm,userLogado.firstName + ' ' + userLogado.lastName ,userId)*/
        this.messageService.addMessage(messageAux)
            .subscribe({
                next: (dadosSucesso:any)=>{
                    console.log(dadosSucesso.myMsgSucesso);
                    console.log({content: dadosSucesso.objMessageSave.content});
                    console.log({_id: dadosSucesso.objMessageSave._id});
                    console.log({content: dadosSucesso.objMessageSave.username});
                    

                },
                error: (dadosErro)=>{
                    console.log(`$== !!error (subscribe): - ${dadosErro.myMsgErro}==`);
                    console.log(dadosErro);
                }

            });
        form.resetForm();
            
    }  //novo abaixo para testar se atualiza automático.
    
         
}


