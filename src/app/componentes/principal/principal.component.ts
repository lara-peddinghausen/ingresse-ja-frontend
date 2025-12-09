import { Component, DoCheck } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'; // Manter esta importação, pois ela é usada pelo abrirConfirmacao()
import { CaixaDialogoConfirmacaoComponent } from '../dialogos/caixa-dialogo-confirmacao/caixa-dialogo-confirmacao.component';

import { IngressoService } from '../../servicos/ingresso.service'; 
import { CupomService } from '../../servicos/cupom.service'; 

// 2. REMOVER IMPORTAÇÕES DE COMPONENTES DE DIÁLOGO NÃO UTILIZADAS

@Component({
  selector: 'app-principal',
  imports: [
        RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, CommonModule, 
        CaixaDialogoConfirmacaoComponent,
        // Adicionar os novos componentes aqui no futuro
    ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements DoCheck {

  // 3. CONSTRUTOR LIMPO (Mantive os serviços por consistência, mas o MatDialog é necessário para a confirmação)
  constructor(
    private router: Router, 
    private dialog: MatDialog, // NECESSÁRIO para abrirConfirmacao()
    private ingressoService: IngressoService, // Injeção do serviço Ingresso (OPCIONAL/MANTIDO)
    private cupomService: CupomService        // Injeção do serviço Cupom (OPCIONAL/MANTIDO)
  ) {}

  logado: boolean = false;

  ngDoCheck(): void {
    this.logado = localStorage.getItem('logado') === 'true';
  }
  
  // --- MÉTODOS DE DIÁLOGO DE CRIAÇÃO REMOVIDOS ---
  // Os métodos abrirCriarIngresso() e abrirCriarCupom() foram removidos.
  
  // --- MÉTODOS EXISTENTES (Confirmar e Sair) ---
  
  async sair() {
    if (await this.abrirConfirmacao('Atenção', 'Deseja realmente sair?')) {
      localStorage.removeItem('logado');
      this.logado = false;
      this.router.navigate(['/']); 
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