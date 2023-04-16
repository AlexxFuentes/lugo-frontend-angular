import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() nombreUsuario: string = '';
  @Input() idUsuario: string = '';
  listaCategorias: any[] = [];
  detalleEmpresasCategoria: any = [];
  nombreCategoria: string = '';
  cantidad: number = 0;

  constructor(private modalService: NgbModal, 
    private categoriaServices: CategoriasService,
    private usuarioServices: UsuariosService, 
    private comunicacion: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.comunicacion.actualizar$.subscribe(() => this.obtenerCategorias());
  }

  pedir(idUsuario: string, producto: any){
    const nuevaOrden = {
      nombreProducto: producto.nombreProducto,
      descripcion: producto.descripcion,
      cantidad: producto.cantidad,
      precio: producto.precio
    }
    //console.log('Nueva orden para ', idUsuario);
    //console.table(nuevaOrden);
    this.nuevaOrden(idUsuario, nuevaOrden);
  }

  nuevaOrden(idUsuario: string, producto: any) {
    this.usuarioServices.crearNuevaOrden(idUsuario, producto).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  obtenerCategorias() {
    this.categoriaServices.obtenerCategorias().subscribe(
      (data: any) => {
        this.listaCategorias = data;
        console.log(this.listaCategorias);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  obtenerDetalleCategoria(idCategoria: string) {
    this.categoriaServices.obtenerDetalleCategoria(idCategoria).subscribe(
      (data: any) => {
        this.nombreCategoria = data.nombreCategoria;
        this.detalleEmpresasCategoria = data.empresas;
        //console.log(this.detalleEmpresasCategoria);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  open(content: any, idCategoria: string) {
    console.log(idCategoria);
    this.obtenerDetalleCategoria(idCategoria);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true , size: 'xl'});
	}
}

