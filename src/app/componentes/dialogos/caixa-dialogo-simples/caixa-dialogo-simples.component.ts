import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-caixa-dialogo-simples',
  imports: [MatDialogModule],
  templateUrl: './caixa-dialogo-simples.component.html',
  styleUrl: './caixa-dialogo-simples.component.css'
})
export class CaixaDialogoSimplesComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {}
} //aproveitar para PI3
