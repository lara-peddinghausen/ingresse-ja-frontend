import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './componentes/principal/principal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, PrincipalComponent], //Tem que lembrar de importar. Import tem que aparecer acima. Sempre que eu quiser usar um componente dentro do outro, tem que importar. Falou em importar, classe typescript (ts).
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IngresseJa';
  // responsavel = 'Zezinho';
  // listaEquipe = ['João', 'Maria', 'Luciana'];
  // cor = '#0000ff'; 
  // tamanhoFonte = 20;
  // classe = 'corFundo';
  // exibirComponenteEventos = true;
}
