import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatSelectModule } from '@angular/material/select'; // Adicionado para dropdown

// Ajuste o caminho para o serviço, que está dois níveis acima
import { IngressoService } from '../../../servicos/ingresso.service'; 


@Component({
  selector: 'app-ingresso',
  standalone: true, 
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule,
    MatSelectModule // Usaremos isso para o tipo de ingresso
  ],
  templateUrl: './ingresso.component.html',
  styleUrls: ['./ingresso.component.css']
})
export class IngressoComponent implements OnInit {
  
  ingressoForm!: FormGroup;
  loading: boolean = false;
  
  // Opções fixas para o tipo de ingresso (você pode carregar isso dinamicamente depois)
  tiposIngresso: string[] = ['Pista', 'VIP', 'Camarote', 'Meia', 'Cortesia'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ingressoService: IngressoService 
  ) {}

  ngOnInit(): void {
    // Inicializar o Formulário Reativo
    this.ingressoForm = this.fb.group({
      tipoIngresso: ['', Validators.required],
      eventoId: [null, [Validators.required, Validators.min(1)]] // ID do Evento deve ser > 0
    });
  }

  // Método de Submissão
  async onSubmit() {
    if (this.ingressoForm.invalid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.loading = true;
    
    // Pegar os valores do formulário
    const { tipoIngresso, eventoId } = this.ingressoForm.value;

    try {
      // Chamar o serviço de cadastro
      await this.ingressoService.cadastrarIngresso(
        tipoIngresso,
        eventoId
      );

      alert('Ingresso cadastrado com sucesso!');
      // Navegar após o sucesso
      this.router.navigate(['/home']); 

    } catch (error) {
      console.error('Erro ao cadastrar ingresso:', error);
      alert('Falha ao cadastrar ingresso. Verifique o console.');
    } finally {
      this.loading = false;
    }
  }

  // Método para voltar
  voltar() {
    this.router.navigate(['/home']);
  }
}