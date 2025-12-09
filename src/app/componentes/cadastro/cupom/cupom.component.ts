import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necessário para Angular Standalone
import { MatButtonModule } from '@angular/material/button'; // Para o botão
import { MatFormFieldModule } from '@angular/material/form-field'; // Para campos do formulário
import { MatInputModule } from '@angular/material/input'; // Para inputs
import { MatCardModule } from '@angular/material/card'; // Para o container do formulário

// 1. Importar o Serviço de Cupom
import { CupomService } from '../../../servicos/cupom.service';

@Component({
  selector: 'app-cupom',
  standalone: true, // Assumindo que você está usando componentes standalone
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule
  ],
  templateUrl: './cupom.component.html',
  styleUrls: ['./cupom.component.css']
})
export class CupomComponent implements OnInit {
  
  cupomForm!: FormGroup; // ! indica que será inicializado no ngOnInit
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cupomService: CupomService // 2. Injetar o serviço
  ) {}

  ngOnInit(): void {
    // 3. Inicializar o Formulário Reativo
    this.cupomForm = this.fb.group({
      cupomNome: ['', Validators.required],
      valorDesconto: [null, [Validators.required, Validators.min(1), Validators.max(100)]], // 1 a 100%
      eventoId: [null, [Validators.required, Validators.min(1)]] // ID do Evento deve ser > 0
    });
  }

  // 4. Método de Submissão
  async onSubmit() {
    if (this.cupomForm.invalid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.loading = true;
    
    // Pegar os valores do formulário
    const { cupomNome, valorDesconto, eventoId } = this.cupomForm.value;

    try {
      // Chamar o serviço de cadastro
      await this.cupomService.cadastrarCupom(
        cupomNome,
        valorDesconto,
        eventoId
      );

      alert('Cupom cadastrado com sucesso!');
      // 5. Navegar após o sucesso (comportamento de página)
      this.router.navigate(['/home']); 

    } catch (error) {
      console.error('Erro ao cadastrar cupom:', error);
      alert('Falha ao cadastrar cupom. Verifique o console.');
    } finally {
      this.loading = false;
    }
  }

  // Método para voltar (opcional)
  voltar() {
    this.router.navigate(['/home']);
  }
}