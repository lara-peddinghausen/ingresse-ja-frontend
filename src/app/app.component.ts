import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './componentes/principal/principal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, PrincipalComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IngresseJa';
}
