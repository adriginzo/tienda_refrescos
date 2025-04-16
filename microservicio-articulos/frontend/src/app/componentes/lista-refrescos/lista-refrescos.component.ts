import { Component, OnInit } from '@angular/core';
import { RefrescosService } from '../../servicios/refrescos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-refrescos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-refrescos.component.html',
  styleUrls: ['./lista-refrescos.component.css']
})

export class ListaRefrescosComponent implements OnInit {
  // Estados del componente
  mostrarFormulario = false;
  mostrarLista = false;
  mostrarBuscador = false;
  mostrarFormularioModificacion = false;
  submitted = false;
  submittedModificacion = false;

  // Datos
  refrescos: any[] = [];
  refrescosFiltrados: any[] = [];
  refrescoEncontrado: any[] = [];
  refrescoModificar: any | null = null;

  // Filtros y búsqueda
  idBusqueda = '';
  filtroEnvase = '';
  idVerificar = '';
  resultadoVerificacion = '';

  // Modelo de formulario
  nuevoRefresco: any = {
    nombre: '',
    marca: '',
    sabor: '',
    volumen: null,
    tipoEnvase: 'lata',
    cantidad: null,
    precio: null
  };

  constructor(private refrescosService: RefrescosService) {}

  ngOnInit(): void {}


  private resetearFormulario(): void {
    this.nuevoRefresco = {
      nombre: '',
      marca: '',
      sabor: '',
      volumen: null,
      tipoEnvase: 'lata',
      cantidad: null,
      precio: null
    };
    this.submitted = false;
  }

  private reiniciarPagina(): void {
    this.mostrarFormulario = false;
    this.mostrarLista = false;
    this.mostrarBuscador = false;
    this.mostrarFormularioModificacion = false;
    this.submitted = false;
    this.submittedModificacion = false;

    this.refrescos = [];
    this.refrescosFiltrados = [];
    this.refrescoEncontrado = [];
    this.refrescoModificar = null;

  }

 
  toggleFormulario(): void {

    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.refrescosService.obtenerRefrescos(this.idVerificar).subscribe({
      next: () => {
        this.resultadoVerificacion = '';
        this.mostrarFormulario = !this.mostrarFormulario;
        this.submitted = false;
        if (!this.mostrarFormulario) {
          this.resetearFormulario();
        }

      },
      error: (error) => {        
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        this.refrescos = [];
        return;
      }
    });
    
  }



  toggleBuscador(): void {

    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.refrescosService.obtenerRefrescos(this.idVerificar).subscribe({
      next: () => {
        this.resultadoVerificacion = '';
        this.mostrarBuscador = !this.mostrarBuscador;
        this.idBusqueda = '';
        this.refrescoEncontrado = [];

      },
      error: (error) => {        
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        this.refrescos = [];
        return;
      }
    });

  }



  toggleLista(): void {

    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.refrescosService.obtenerRefrescos(this.idVerificar).subscribe({
      next: () => {
        this.resultadoVerificacion = '';
        this.mostrarLista = !this.mostrarLista;
        if (this.mostrarLista && this.refrescos.length === 0) {
          this.obtenerRefrescos();
        }

      },
      error: (error) => {        
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        this.refrescos = [];
        return;
      }
    });
    
  }



  cancelarModificacion(): void {

    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.refrescosService.obtenerRefrescos(this.idVerificar).subscribe({
      next: () => {
        this.resultadoVerificacion = '';
        this.mostrarFormularioModificacion = false;
        this.refrescoModificar = null;

      },
      error: (error) => {
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        this.refrescos = [];
        return;
      }
    });
    
  }



  filtrarRefrescos(): void {

    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.refrescosService.obtenerRefrescos(this.idVerificar).subscribe({
      next: () => {
        this.resultadoVerificacion = '';
        this.refrescosFiltrados = this.filtroEnvase 
          ? this.refrescos.filter(refresco => refresco.tipoEnvase === this.filtroEnvase)
          : [...this.refrescos];

      },
      error: (error) => {
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        this.refrescos = [];
        return;
      }
    });
    
  }



  mostrarFormularioModificar(refresco: any): void {

    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }
    this.refrescosService.obtenerRefrescos(this.idVerificar).subscribe({
      next: () => {
        this.resultadoVerificacion = '';
        this.refrescoModificar = { ...refresco };
        this.mostrarFormularioModificacion = true;

      },
      error: (error) => {        
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        this.refrescos = [];
        return;
      }
    });
    
  }



  obtenerRefrescos(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return; // Salir si no hay ID
    }

    this.refrescosService.obtenerRefrescos(this.idVerificar).subscribe({
      next: (data) => {
        this.resultadoVerificacion = ''; 
        this.refrescos = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        this.filtrarRefrescos();
      },
      error: (error) => {
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        this.refrescos = [];
        return;
      }
    });
  }



  agregarRefresco(form: any): void {
    this.submitted = true;
    if (!form.valid) return;

    this.refrescosService.agregarRefresco(this.idVerificar, this.nuevoRefresco).subscribe({
      next: () => {
        this.resultadoVerificacion = ''; 
        this.obtenerRefrescos(); 
        this.toggleFormulario();
        this.resetearFormulario();
      },
      error: (error) => {
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        return;
      }
    });
  }



  modificarRefresco(form: any): void {
    this.submittedModificacion = true;
    if (!form.valid || !this.refrescoModificar) return;

    const refrescoActualizado = { ...this.refrescoModificar };
    this.refrescosService.actualizarRefresco(this.idVerificar, this.refrescoModificar._id, refrescoActualizado ).subscribe({
        next: () => {
          this.resultadoVerificacion = ''; 
          this.obtenerRefrescos();
          this.cancelarModificacion();
        },
        error: (error) => {
          this.resultadoVerificacion =`Error: ${error.error.message}`;
          this.reiniciarPagina();
          return;
        }
      });
  }



  borrarRefresco(refrescoId: string): void {

    this.refrescosService.borrarRefresco(this.idVerificar, refrescoId).subscribe({
      next: () => {
        this.resultadoVerificacion = ''; 
        this.refrescos = this.refrescos.filter(r => r._id !== refrescoId);
        this.filtrarRefrescos();
      },
      error: (error) => {
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        return;
      }
    });
  }



  buscarRefrescoPorId(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID';
      return;
    }

    if (!this.idBusqueda) {
      this.refrescoEncontrado = [];
      return;
    }

    const servicioBusqueda = /^\d/.test(this.idBusqueda)
      ? this.refrescosService.buscarRefrescoPorId(this.idVerificar, this.idBusqueda)
      : this.refrescosService.buscarRefrescoPorNombre(this.idVerificar, this.idBusqueda);

    servicioBusqueda.subscribe({
      next: (data) => {
        this.resultadoVerificacion = '';
        this.refrescoEncontrado = Array.isArray(data) ? data : (data ? [data] : []);
      },
      error: (error) => {
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        this.refrescoEncontrado = [];
        return;
      }
    });
  }

}