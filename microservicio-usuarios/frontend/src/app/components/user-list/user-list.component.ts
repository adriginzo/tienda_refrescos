import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  // Estados del componente
  mostrarFormularioCreacion = false;
  mostrarFormularioEliminacion = false;
  mostrarLista = false;
  mostrarBuscador = false;
  submittedCreacion = false;
  submittedEliminacion = false;

  // Datos
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  usuarioEncontrado: any[] = [];
  usuarioAEliminar: any = { _id: '' };

  // Filtros y búsqueda
  idBusqueda = '';
  filtroRole = '';
  idVerificar = '';
  resultadoVerificacion = '';
  mensajeExito: string = '';
  nuevoUsuarioId: string = '';
  mensajeEliminacion: string = '';

  // Modelo de formulario
  nuevoUsuario: any = {
    role: 'Cliente'
  };

  // Propiedades de autenticación
  authenticated = false;
  isAdmin = false;

  constructor(private userService: UserService) {}


  private reiniciarPagina(): void{
    this.mostrarFormularioCreacion = false;
    this.mostrarFormularioEliminacion = false;
    this.mostrarLista = false;
    this.mostrarBuscador = false;
    this.submittedCreacion = false;
    this.submittedEliminacion = false;

    this.usuarios = [];
    this.usuariosFiltrados = [];
    this.usuarioEncontrado = [];
    this.usuarioAEliminar = { _id: '' };
  }


  // Métodos de UI
  toggleFormularioCreacion(): void {
    this.mostrarFormularioCreacion = !this.mostrarFormularioCreacion;

    if(this.mostrarFormularioCreacion) {
        this.nuevoUsuario = { role: 'Cliente' };
        this.submittedCreacion = false;
        this.mensajeExito = '';
        this.nuevoUsuarioId = '';
    }
        
  }

  toggleBuscador(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.userService.obtenerUsuarios(this.idVerificar).subscribe({
      next: (data) => {
        this.resultadoVerificacion = '';
        this.mostrarBuscador = !this.mostrarBuscador;
        this.idBusqueda = '';
        this.usuarioEncontrado = [];
      },
      error: (error) => {
        this.resultadoVerificacion = error.error.message;
        this.reiniciarPagina();
        this.usuarios = [];
      }
    });
    
  }

  toggleLista(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.userService.obtenerUsuarios(this.idVerificar).subscribe({
      next: (data) => {
        this.resultadoVerificacion = '';
        this.mostrarLista = !this.mostrarLista;
        if (this.mostrarLista && this.usuarios.length === 0) {
          this.obtenerUsuarios();
        }
      },
      error: (error) => {
        this.resultadoVerificacion = error.error.message;
        this.reiniciarPagina();
        this.usuarios = [];
      }
    });
    
  }

  mostrarFormularioEliminar(usuario?: any): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.userService.obtenerUsuarios(this.idVerificar).subscribe({
      next: (data) => {
        this.resultadoVerificacion = '';
        this.usuarioAEliminar = usuario ? { ...usuario } : { _id: '' };
        this.mostrarFormularioEliminacion = true;
      },
      error: (error) => {
        this.resultadoVerificacion = error.error.message;
        this.reiniciarPagina();
        this.usuarios = [];
      }
    });
    
  }

  cancelarEliminacion(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.userService.obtenerUsuarios(this.idVerificar).subscribe({
      next: (data) => {
        this.mostrarFormularioEliminacion = false;
        this.usuarioAEliminar = { _id: '' };
        this.resultadoVerificacion = '';
      },
      error: (error) => {
        this.resultadoVerificacion = error.error.message;
        this.reiniciarPagina();
        this.usuarios = [];
      }
    });
    
  }

  filtrarUsuarios(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.userService.obtenerUsuarios(this.idVerificar).subscribe({
      next: (data) => {
        this.resultadoVerificacion = '';
        this.usuariosFiltrados = this.filtroRole
          ? this.usuarios.filter(usuario => usuario.role === this.filtroRole)
          : [...this.usuarios];
      },
      error: (error) => {
        this.resultadoVerificacion = error.error.message;
        this.reiniciarPagina();
        this.usuarios = [];
      }
    });
    
  }

  // Métodos CRUD
  obtenerUsuarios(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.userService.obtenerUsuarios(this.idVerificar).subscribe({
      next: (data) => {
        this.usuarios = data;
        this.filtrarUsuarios();
        this.resultadoVerificacion = '';
      },
      error: (error) => {
        this.resultadoVerificacion = error.error.message;
        this.reiniciarPagina();
        this.usuarios = [];
      }
    });
  }

  crearUsuario(): void {
    

    this.submittedCreacion = true;
  
    this.userService.createUsuarios(this.nuevoUsuario).subscribe({
      next: (response: any) => {
        this.nuevoUsuarioId = response._id;
        this.mensajeExito = '¡Usuario creado con éxito!';
        this.obtenerUsuarios();
        this.resultadoVerificacion = '';
        
        // Resetea el formulario
        this.nuevoUsuario = { role: 'Cliente' };
        this.submittedCreacion = false;
      },
      error: (error) => {
        this.resultadoVerificacion = error.error.message;
        this.reiniciarPagina();
        this.mensajeExito = '';
      }
    });
  }

  borrarUsuario(usuarioAEliminar: String): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }

    this.submittedEliminacion = true;

    this.userService.deleteUsuarios(this.idVerificar, usuarioAEliminar).subscribe({
      next: () => {
        this.obtenerUsuarios();
        this.cancelarEliminacion();
        this.resultadoVerificacion = '';
      },
      error: (error) => {
        this.resultadoVerificacion = error.error.message;
        this.reiniciarPagina();
      }
    });
  }

  borrarUsuarioActual(usuarioAEliminar: String): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }

    this.submittedEliminacion = true;

    this.userService.deleteUsuariosActual(usuarioAEliminar).subscribe({
      next: () => {
        this.cancelarEliminacionActual();
        this.resultadoVerificacion = '';
        this.reiniciarPagina();
        this.idVerificar = '';
      
      },
      error: (error) => {
        this.resultadoVerificacion = error.error.message;
        this.reiniciarPagina();
        this.idVerificar = '';
      }
    });
  }

  cancelarEliminacionActual(): void {
    this.mostrarFormularioEliminacion = false;
    this.usuarioAEliminar = { _id: '' };
    
  }

  buscarUsuarioPorId(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return;
    }

    if (!this.idBusqueda || this.idBusqueda.trim().length < 2) {  // Evita consultas con menos de 2 caracteres
      this.usuarioEncontrado = [];
      this.resultadoVerificacion = 'Escriba al menos 2 caracteres para buscar.';
      return;
    }

    const esId = /^\d+$/.test(this.idBusqueda);  // Solo números (ID exacto)
    
    const servicioBusqueda = this.userService.obtenerUsuariosById(this.idBusqueda);

    servicioBusqueda.subscribe({
      next: (data) => {
        this.usuarioEncontrado = Array.isArray(data) ? data : (data ? [data] : []);
        this.resultadoVerificacion = '';
      },
      error: (error) => {
        this.usuarioEncontrado = [];
        this.reiniciarPagina();
        this.resultadoVerificacion = error.error.message;
      }
    });
}



  
}