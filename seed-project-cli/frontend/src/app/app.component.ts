import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="container">
      <div class="row">
          <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding-top: 20px;
    }
  `]
})
export class AppComponent {
  title = 'frontend';
  valorNgSwitch: number = 0;
}