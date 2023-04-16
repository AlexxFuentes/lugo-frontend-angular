import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  apiURL:string = 'http://localhost:8888';

  constructor(private httpClient: HttpClient) { }

  crearNuevaCategoria(categoria: any): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/categoria/nueva-categoria`, 
    {
      nombreCategoria: categoria.nombreCategoria, 
      descripcion: categoria.descripcion, 
      color: categoria.color
    });
  }

  obtenerCategorias(): Observable<any>{
    return this.httpClient.get(`${this.apiURL}/categorias`, {});
  }

  obtenerDetalleCategoria(idCategoria: string): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/categoria/${idCategoria}`, {});
  }
}
