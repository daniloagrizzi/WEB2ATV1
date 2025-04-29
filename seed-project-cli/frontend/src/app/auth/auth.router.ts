import {Routes} from "@angular/router";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";

export const AUTH_ROUTES: Routes =[
    {path: '', redirectTo: 'signup', pathMatch: 'full'},
    {path: 'signup', 'title': 'Auttenticação | SignUp', component: SignupComponent},
    {path: 'signin', 'title': 'Auttenticação | SignIn', component: SigninComponent},
    {path: 'logout', 'title': 'Auttenticação | LogOut', component: LogoutComponent}
];

