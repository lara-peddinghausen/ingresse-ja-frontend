import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuario';  // URL da API

  constructor(private http: HttpClient) { }

  // Método que utiliza o lastValueFrom para pegar o último valor do Observable
  async verificarUsuario(email: string, senha: string): Promise<any> { 

    const urlLogin = `${this.apiUrl}/login`;  

    const body = {
      email: email,  // Definindo o primeiro campo
      senha: senha   // Definindo o segundo campo
    };
    console.log("Body:", body);

    // APIs que NÃO precisam de token usar esse header
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });
    
    const options = {
      headers: headers,
      responseType: 'text' as 'json'  // Adicionado para tratar a resposta como texto
    };

    const observable: Observable<any> = this.http.post<any>(urlLogin, body, options);
    
    try {
      // Usando lastValueFrom para pegar a última emissão da resposta
      const resposta = await lastValueFrom(observable);
      console.log("Resposta da api:", resposta);
      localStorage.setItem('token', resposta); 
      return resposta;  // Retorna a resposta da API
    } catch (erro) {
      console.log('Erro da api:', erro);
      throw erro;
    }
  }

  async cadastrarUsuario( nome: string, email: string, senha: string): Promise<any> {

    const urlCadastro = `${this.apiUrl}/salvar`;

    const body = {
      nome: nome,
      email: email,
      senha: senha
    };
    console.log("Body:", body);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    const options = {
      headers: headers
    };
  
    const observable: Observable<any> = this.http.post<any>(urlCadastro, body, options);
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