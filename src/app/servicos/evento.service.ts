import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'http://localhost:8080/api/evento/salvar';  // URL da API

  constructor(private http: HttpClient) { }

  async cadastrarEvento( nomeEvento: string): Promise<any> {

    const body = {
      nomeEvento: nomeEvento,
    };
    console.log("Body:", body);

    const token = localStorage.getItem('token');  

    // APIs que precisam de token usar esse header
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
      console.log("Resposta da api:", resposta);
      return resposta;
    } catch (erro) {
      console.log('Erro cadastro:', erro);
      throw erro;
    }

  }
}
