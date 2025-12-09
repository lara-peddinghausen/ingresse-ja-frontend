import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CaixaDialogoSimplesComponent } from '../dialogos/caixa-dialogo-simples/caixa-dialogo-simples.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterLink} from '@angular/router';
import { UsuarioService } from '../../servicos/usuario.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, CaixaDialogoSimplesComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;  // Definindo o formulário reativo
  dados: any; // incluído - retorno do serviço
  erro: any; // incluído - mensagem de erro do serviço

  constructor(private dialog: MatDialog, private router: Router, private usuarioService: UsuarioService) { // alterado
    // Criando o FormGroup com os FormControls para email e senha
    this.loginForm = new FormGroup({
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
  
  async verificarDados(email: string, senha: string): Promise<void> { // incluído o método inteiro
    try {
      this.dados = await this.usuarioService.verificarUsuario(email, senha); // Chama o serviço
      console.log('Dados recebidos:', this.dados);
      this.erro = null;  // Se os dados foram carregados corretamente, limpa a mensagem de erro
    } catch (erro) {
      console.log('Erro recebido da api:', erro);
      this.erro = erro; // Armazena o json da mensagem de erro
    }
  }
  // Função para lidar com o envio do formulário
  async onSubmit() { // Alterado - incluído o async
    if (this.loginForm.valid) {
      console.log('Formulário válido', this.loginForm.value);
      await this.verificarDados(this.loginForm.get('email')?.value, this.loginForm.get('senha')?.value); // incluído
      //if (this.loginForm.get('email')?.value == 'teste@teste.com' && this.loginForm.get('senha')?.value == '123456') { // alterado
      if (this.erro === null) { // incluído
        this.abrirDialogo('Informação', 'Login realizado com sucesso!');
        // Incluir acesso à página home
        localStorage.setItem('logado', 'true');
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        // this.abrirDialogo('Erro', 'Informações incorretas'); // alterado
        this.abrirDialogo('Erro', `ERROR: ${this.erro.erro}`); // incluído - //No projeto não temos status(this.erro.status tem que apagar) (this.erro.error.error tem que trocara error para erro, fica this.erro.erro). Re
      }
    } else {
      console.log('Formulário inválido');
      this.loginForm.markAllAsTouched(); // Marca todos os campos como tocados
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
;