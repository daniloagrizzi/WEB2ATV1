import { Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule,Validators} from "@angular/forms"
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { first } from "rxjs";
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
@Component({
    selector:'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule,HttpClientModule, CommonModule],	
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
    myForm! : FormGroup;
    constructor(private http: HttpClient, private router: Router){}
    avatarList: string[] = [
      'assets/avatars/avatar1.png',
      'assets/avatars/avatar2.png',
      'assets/avatars/avatar3.png',
    ];
    successMessage: string = '';
    
    onSubmit(){
        console.log("Formulário enviado!")
        console.log(this.myForm);
        const userData = {
            firstName: this.myForm.value.firstNameTS,
            lastName: this.myForm.value.lastNameTS,
            email: this.myForm.value.emailTS,
            password: this.myForm.value.passwordTS,
            imageUrl: this.myForm.value.avatarTS,
            country: this.myForm.value.countryTS,
            terms: this.myForm.value.termsTS,
          };
      
          this.http.post('/api/autenticacao/signup', userData).subscribe({
            next: res => {
              console.log('Usuário cadastrado com sucesso:', res);
              console.log({firstName: this.myForm.value.firstNameTS});
              console.log({imageUrl: this.myForm.value.avatarTS});
              console.log({email: this.myForm.value.emailTS});
              console.log({password: this.myForm.value.passwordTS});
              console.log({lastName: this.myForm.value.lastNameTS});
              this.successMessage = 'Cadastro realizado com sucesso!';


              this.myForm.reset();
              setTimeout(() => {
                this.router.navigate(['/autenticacao/signin']);
              }, 1000);
            },
            error: err => {
              console.error('Erro ao cadastrar usuário:', err);
            }
          });
        }
        //this.myForm.reset();
    

    ngOnInit(){
        this.myForm = new FormGroup({
            firstNameTS: new FormControl(null, Validators.required),

            lastNameTS: new FormControl(null, [
                Validators.required, 
                Validators.minLength(4), 
                Validators.maxLength(16)
            ]),
            emailTS: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                
            ]),
            passwordTS: new FormControl(null, [Validators.required, Validators.minLength(4)]),
            avatarTS: new FormControl(null, Validators.required),
            countryTS: new FormControl(null, Validators.required),
            termsTS: new FormControl(false, [Validators.requiredTrue])
        })
    }

}