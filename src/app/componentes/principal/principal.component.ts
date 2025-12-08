import { AfterViewChecked, Component, DoCheck } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CaixaDialogoConfirmacaoComponent } from '../dialogos/caixa-dialogo-confirmacao/caixa-dialogo-confirmacao.component';

@Component({
  selector: 'app-principal',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, CommonModule, CaixaDialogoConfirmacaoComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements DoCheck {

  constructor(private router: Router, private dialog: MatDialog) {}

  logado: boolean = false;

  // ngAfterViewChecked(): void {
  //   // Define o valor da propriedade logado com base no conteúdo do localStorage
  //   this.logado = localStorage.getItem('logado') === 'true';
  // }
  ngDoCheck(): void {
    // Define o valor da propriedade logado com base no conteúdo do localStorage
    this.logado = localStorage.getItem('logado') === 'true';
  }
  async sair() {
    if (await this.abrirConfirmacao('Atenção', 'Deseja realmente sair?')) {
      localStorage.removeItem('logado');
      this.logado = false;
      this.router.navigate(['/']); // Redirecionar para a página de Login
    }
  }
  abrirConfirmacao(tituloDialogo : string, conteudoDialogo : string) : Promise<boolean> {
    const caixaConfirmacao = this.dialog.open(CaixaDialogoConfirmacaoComponent, {
      width: '200px',
      height: '200px',
      data: {
        titulo: tituloDialogo,
        conteudo: conteudoDialogo
      },
    });
    return lastValueFrom(caixaConfirmacao.afterClosed());
  }
}
