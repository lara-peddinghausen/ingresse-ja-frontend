import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaDialogoConfirmacaoComponent } from './caixa-dialogo-confirmacao.component';

describe('CaixaDialogoConfirmacaoComponent', () => {
  let component: CaixaDialogoConfirmacaoComponent;
  let fixture: ComponentFixture<CaixaDialogoConfirmacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaixaDialogoConfirmacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaixaDialogoConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
