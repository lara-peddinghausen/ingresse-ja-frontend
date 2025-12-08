import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaDialogoSimplesComponent } from './caixa-dialogo-simples.component';

describe('CaixaDialogoSimplesComponent', () => {
  let component: CaixaDialogoSimplesComponent;
  let fixture: ComponentFixture<CaixaDialogoSimplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaixaDialogoSimplesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaixaDialogoSimplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
