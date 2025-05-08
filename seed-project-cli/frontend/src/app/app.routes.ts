import { Routes } from '@angular/router';
import { LoginComponent } from './Components/auth/login.component';
import { RegisterComponent } from './Components/auth/register.component';
import { HomeComponent } from './Components/auth/home.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { AuthGuard } from './Components/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
 { path: 'registro', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];