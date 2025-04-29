import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from './messages/message.component';
import { FormularioContent } from './zformcomponente/formulario.component';
import { Message } from './messages/message.model';
import { MessageComponentSignal } from './messages/message-signal.component';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  messageBinding: Message = new Message("Texto do input","Matheus Souza");
  messageS: Message[] = [ new Message("Texto 01 da mensagem", "Matheus Souza"),
                          new Message("Texto 02 da mensagem", "Rosalen"), 
                          new Message("Texto 03, da mensagem", "SouzaMatheus")

  ];
  mostrarElemento: boolean = true;
  onMudaMostrarElemento(){
    this.mostrarElemento = !this.mostrarElemento;
  }
  outputMessageReceived(message: string){
    alert('recebi')
  }
  title ='frontend';

  valorNgSwitch: number = 0;
  
  //message ={
  //  content: 'Tô ficano monstro em!!',
 //   author: 'Matheus'
  //};

}
  