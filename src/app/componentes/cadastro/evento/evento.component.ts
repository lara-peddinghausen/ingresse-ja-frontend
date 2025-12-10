import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CaixaDialogoSimplesComponent } from '../../dialogos/caixa-dialogo-simples/caixa-dialogo-simples.component';
import { EventoService } from '../../../servicos/evento.service';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-evento',
  imports: [ReactiveFormsModule, CommonModule, CaixaDialogoSimplesComponent, RouterLink],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent {
  eventoForm: FormGroup;  // Definindo o formulário reativo
  dados: any; // incluído - retorno do serviço
  erro: any; // incluído - mensagem de erro do serviço

  constructor(private dialog: MatDialog, private router: Router, private eventoService: EventoService) { // alterado
    // Criando o FormGroup com os FormControls para email e senha
    this.eventoForm = new FormGroup({
      nomeEvento: new FormControl('', [ // Validação do preenchimento do nome
        Validators.required
      ])
    });
  }

  async verificarDados(nomeEvento: string): Promise<void> { // incluído o método inteiro
    try {
      this.dados = await this.eventoService.cadastrarEvento(nomeEvento); // Chama o serviço
      console.log('Dados recebidos:', this.dados);
      this.erro = null;  // Se os dados foram carregados corretamente, limpa a mensagem de erro
    } catch (erro) {
      console.log('Erro recebido da api:', erro);
      this.erro = erro; // Armazena o json da mensagem de erro
    }
  }

  async onSubmit() { // Alterado - incluído o async
    if (this.eventoForm.valid) {
      console.log('Formulário válido', this.eventoForm.value);
      await this.verificarDados(this.eventoForm.get('nomeEvento')?.value); // incluído
      if (this.erro === null) { // incluído
        this.abrirDialogo('Informação', 'Evento cadastrado com sucesso!');
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.abrirDialogo('Erro', `ERROR: ${this.erro.erro}`); // incluído
      }
    } else {
      console.log('Formulário inválido');
      this.eventoForm.markAllAsTouched(); // Marca todos os campos como tocados
    }
  }

  abrirDialogo(tituloDialogo: string, conteudoDialogo: string) {
    const caixaDialogo = this.dialog.open(CaixaDialogoSimplesComponent, {
      width: '200px',
      height: '200px',
      data: {
        titulo: tituloDialogo,
        conteudo: conteudoDialogo
      },
    });
  }
}
