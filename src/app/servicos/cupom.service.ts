// src/app/servicos/cupom.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

// Interface de suporte para a Entidade Evento (a mesma usada no Ingresso)
export interface EventoId {
    eventoId: number;
}

// Interface principal da Entidade Cupom (ajuste os tipos conforme sua API Java)
export interface Cupom {
    cupomNome: string;
    valorDesconto: number;
    evento: EventoId;
}


@Injectable({
  providedIn: 'root'
})
export class CupomService {
  private apiUrl = 'http://localhost:8080/api/cupom/salvar'; // URL da API de salvar cupom

  constructor(private http: HttpClient) { }

  async cadastrarCupom(cupomNome: string, valorDesconto: number, eventoId: number): Promise<any> {

    // Cria o objeto body no formato exigido pela API
    const body: Cupom = {
      cupomNome: cupomNome,
      valorDesconto: valorDesconto,
      evento: { eventoId: eventoId } // Objeto aninhado para o relacionamento
    };
    console.log("Body Cupom:", body);

    const token = localStorage.getItem('token'); 

    // Header com Content-Type e Authorization Bearer
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const options = {
      headers: headers
    };
  
    const observable: Observable<any> = this.http.post<any>(this.apiUrl, body, options);
    try {
      const resposta = await lastValueFrom(observable);
      console.log("Resposta da API (Cupom):", resposta);
      return resposta;
    } catch (erro) {
      console.log('Erro cadastro Cupom:', erro);
      throw erro;
    }
  }
}