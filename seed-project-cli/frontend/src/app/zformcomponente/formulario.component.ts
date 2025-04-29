import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-formulario',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './formulario.component.html',
    styleUrl: './formulario.component.css'

})
export class FormularioContent{
    user ={
        firstname: 'teste',
        email: 'teste@',
        lastname:'opa',
        password: 'teste',
        password2: 'confirmar'


    }
}
