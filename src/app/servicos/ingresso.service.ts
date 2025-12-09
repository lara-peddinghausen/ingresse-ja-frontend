
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

// Interface de suporte para a Entidade Evento (apenas o necessário para o relacionamento)
export interface EventoId {
    eventoId: number;
}

// Interface principal da Entidade Ingresso (ajuste os tipos conforme sua API Java)
export interface Ingresso {
    tipoIngresso: string;
    evento: EventoId;
}


@Injectable({
  providedIn: 'root'
})
export class IngressoService {
  private apiUrl = 'http://localhost:8080/api/ingresso/salvar'; // URL da API de salvar ingresso

  constructor(private http: HttpClient) { }

  async cadastrarIngresso(tipoIngresso: string, eventoId: number): Promise<any> {

    // Cria o objeto body no formato exigido pela API
    const body: Ingresso = {
      tipoIngresso: tipoIngresso,
      evento: { eventoId: eventoId } // Objeto aninhado para o relacionamento
    };
    console.log("Body Ingresso:", body);

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
      console.log("Resposta da API (Ingresso):", resposta);
      return resposta;
    } catch (erro) {
      console.log('Erro cadastro Ingresso:', erro);
      throw erro;
    }
  }
}