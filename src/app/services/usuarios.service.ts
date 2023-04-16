import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiURL:string = 'http://localhost:8888';

  constructor(private httpClient: HttpClient) { }

  obtenerDetalleUsuario(): Observable<any>{
    return this.httpClient.get(`${this.apiURL}/usuarios`, {});
  }

  obtenerOrdenesUsuario(idUsuario: string): Observable<any>{
    return this.httpClient.get(`${this.apiURL}/usuario/${idUsuario}/ordenes`, {});
  }

  crearNuevaOrden(idUsuario: string, producto: any): Observable<any>{
    return this.httpClient.post(`${this.apiURL}/usuario/${idUsuario}/nueva-orden`, 
    {
      nombreProducto: producto.nombreProducto,
      descripcion: producto.descripcion,
      cantidad: producto.cantidad,
      precio: producto.precio
    });
  }
}
