import { Component, inject } from "@angular/core";
import { AuthService } from '../auth/auth.service'


@Component({
    selector:'app-logout',
    standalone: true,
    template: `
        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </div>
        `
})
export class LogoutComponent{
    private authService = inject(AuthService);
    onLogout(){
        this.authService.logout();

    }
}