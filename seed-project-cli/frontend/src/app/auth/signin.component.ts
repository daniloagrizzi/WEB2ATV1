import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from '../auth/auth.service';
import {CommonModule} from '@angular/common';



@Component({
    selector:'app-signin',
    standalone: true,
    imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
    templateUrl: './signin.component.html'
    
})
export class SigninComponent{
    myFormIn!: FormGroup;
    constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {}

    onSubmit(){
        const { emailTS: email, passwordTS: password } = this.myFormIn.value;
        this.authService.signin(email, password);
    }
    
    ngOnInit(){
        this.myFormIn = this.fb.group({
            emailTS:[
                null,
                Validators.compose([
                    Validators.required,
                    Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                ]),
            
            ],
            passwordTS:[
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    this.minusculoFValidator
                ])
            
            ]
            

    });
   


}   minusculoFValidator(control: AbstractControl){
        const pass = control.value as string;
        if((pass!==pass?.toLowerCase())&& (pass!== null)){
            return {minusculoF: true};
        }
        else return null;
        
        
} 

}