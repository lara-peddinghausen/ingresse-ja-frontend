import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-caixa-dialogo-confirmacao',
  imports: [MatDialogModule],
  templateUrl: './caixa-dialogo-confirmacao.component.html',
  styleUrl: './caixa-dialogo-confirmacao.component.css'
})
export class CaixaDialogoConfirmacaoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CaixaDialogoConfirmacaoComponent>,
    private dialog: MatDialog) {}

    cancelar(): void {
      this.dialogRef.close(false); // Retorna false ao cancelar
    }
    confirmar(): void {
      this.dialogRef.close(true); // Retorna true ao confirmar
    }
}

