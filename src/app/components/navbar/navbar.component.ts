import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Output() onNombreUsuarioSeleccionado = new EventEmitter();
  @Output() onIdUsuarioSeleccionado = new EventEmitter();
  listaUsuarios: any[] = [];
  listaOrdenesUsuario: any[] = [];
  idUsuarioSeleccionado: string = '';
  nombreUsuarioSeleccionado: string = '';

  // Variables para crear nueva categoria
  nombreCategoria: string = '';
  descripcion: string = '';
  color: string = '';

  constructor(private modalService: NgbModal, 
    private usuarioServices: UsuariosService, 
    private categoriaServices: CategoriasService,
    private comunicacion: ComunicacionService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  guardarCategoria() {
    const nuevaCategoria = {
      nombreCategoria: this.nombreCategoria,
      descripcion: this.descripcion,
      color: this.color
    }
    //console.log('Guardando categoria', nuevaCategoria);
    this.categoriaServices.crearNuevaCategoria(nuevaCategoria).subscribe(
      (data: any) => {
        console.log(data);        
      },
      (error: any) => {
        console.log(error);
      }
    );
    setTimeout(() =>{this.comunicacion.actualizar();}, 1000);
    this.modalService.dismissAll();
  }

  cambiarUsuario() {
    //console.log('ID usuario seleccionado: ' + this.idUsuarioSeleccionado);
    const usuario = this.listaUsuarios.find(usuario => usuario._id === this.idUsuarioSeleccionado);
    const nombreUsuario = `${usuario.nombre} ${usuario.apellido}`;
    this.nombreUsuarioSeleccionado = nombreUsuario;
    this.onIdUsuarioSeleccionado.emit(this.idUsuarioSeleccionado);
    this.onNombreUsuarioSeleccionado.emit(nombreUsuario);
    this.modalService.dismissAll();
  }

  ordenesUsuario() {
    if(this.idUsuarioSeleccionado == '') return;
    this.usuarioServices.obtenerOrdenesUsuario(this.idUsuarioSeleccionado).subscribe(
      (data: any) => {
        this.listaOrdenesUsuario = data.ordenes;
        console.log(this.listaOrdenesUsuario);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cargarUsuarios() {
    this.usuarioServices.obtenerDetalleUsuario().subscribe(
      (data: any) => {
        this.listaUsuarios = data;
        console.log(this.listaUsuarios);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
	}
}
