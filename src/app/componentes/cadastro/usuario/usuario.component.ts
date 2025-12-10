import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CaixaDialogoSimplesComponent } from '../../dialogos/caixa-dialogo-simples/caixa-dialogo-simples.component';
import { UsuarioService } from '../../../servicos/usuario.service';


@Component({
  selector: 'app-usuario',
  imports: [ReactiveFormsModule, CommonModule, CaixaDialogoSimplesComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  usuarioForm: FormGroup;  // Definindo o formulário reativo
  dados: any; // incluído - retorno do serviço
  erro: any; // incluído - mensagem de erro do serviço

  constructor(private dialog: MatDialog, private router: Router, private usuarioService: UsuarioService) { // alterado
    // Criando o FormGroup com os FormControls para email e senha
    this.usuarioForm = new FormGroup({
      nome: new FormControl('', [ // Validação do preenchimento do nome
        Validators.required
      ]),
      email: new FormControl('', [ // Validação do preenchimento do e-mail
        Validators.required,
        Validators.email
      ]),
      senha: new FormControl('', [ // Validação do preenchimento da senha
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  async verificarDados(nome: string, email: string, senha: string): Promise<void> { // incluído o método inteiro
    try {
      this.dados = await this.usuarioService.cadastrarUsuario(nome, email, senha); // Chama o serviço
      console.log('Dados recebidos:', this.dados);
      this.erro = null;  // Se os dados foram carregados corretamente, limpa a mensagem de erro
    } catch (erro) {
      console.log('Erro recebido da api:', erro);
      this.erro = erro; // Armazena o json da mensagem de erro
    }
  }

  async onSubmit() { // Alterado - incluído o async
    if (this.usuarioForm.valid) {
      console.log('Formulário válido', this.usuarioForm.value);
      await this.verificarDados(this.usuarioForm.get('nome')?.value ,this.usuarioForm.get('email')?.value, this.usuarioForm.get('senha')?.value); // incluído
      if (this.erro === null) { // incluído
        this.abrirDialogo('Informação', 'Cadastro realizado com sucesso!');
        this.router.navigateByUrl('/', { replaceUrl: true });
      } else {
        this.abrirDialogo('Erro', `ERROR: ${this.erro.erro}`); 
      }
    } else {
      console.log('Formulário inválido');
      this.usuarioForm.markAllAsTouched(); // Marca todos os campos como tocados
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
