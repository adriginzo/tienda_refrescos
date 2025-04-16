import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompraService } from '../../services/compras.service';

@Component({
  selector: 'app-compras-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compras-list.component.html',
  styleUrls: ['./compras-list.component.css']
})
export class ComprasListComponent implements OnInit {

  // Variables para formularios
  nuevaCompra: any = {
    id_cliente: '',
    nombre: '',
    id_articulo: '',
    cantidad: 0,
    direccion: ''
  };

  // Estados del componente
  mostrarRefrescos = false;
  mostrarLista = false;
  mostrarListaCompras = false;
  mostrarBuscador = false;
  mostrarFormularioModificacion = false;
  mostrarComprasRealizadas = false;
  submitted = false;
  submittedModificacion = false;

  // Datos
  refrescos: any[] = [];
  refrescosFiltrados: any[] = [];
  refrescoEncontrado: any[] = [];
  refrescoModificar: any | null = null;
  refrescoAComprar: any | null = null;
  comprasRealizadas: any[] = [];

  // Filtros y búsqueda
  idBusqueda = '';
  filtroEnvase = '';
  idVerificar = '';
  resultadoVerificacion = '';
  cantidadAComprar: number = 1;
  direccionAComprar: string = '';

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {}

  private reiniciarPagina(): void {
    this.mostrarRefrescos = false;
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

  // METODOS PARA LISTAR TODOS LOS ARTICULOS
  public toggleListaRefrescos(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return;
    }
    this.compraService.getAllRefrescos(this.idVerificar).subscribe({
      next: () => {
        this.resultadoVerificacion = '';
        this.mostrarRefrescos = !this.mostrarRefrescos;
        if (this.mostrarRefrescos && this.refrescos.length === 0) {
          this.getAllRefrescos();
        }
      },
      error: (error) => {
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        this.refrescos = [];
      }
    });
  }

  getAllRefrescos(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return;
    }

    this.compraService.getAllRefrescos(this.idVerificar).subscribe({
      next: (data) => {
        this.resultadoVerificacion = '';
        this.refrescos = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      },
      error: (error) => {
        this.resultadoVerificacion = `Error: ${error.error.message}`;
        this.reiniciarPagina();
        this.refrescos = [];
      }
    });
  }

  // METODOS PARA REALIZAR LAS COMPRAS
  toggleComprarRefresco(refresco: any): void {
    this.refrescoAComprar = refresco;
    this.cantidadAComprar = 1;
    this.direccionAComprar = '';
  }

  confirmarCompra(): void {
    if (!this.cantidadAComprar || this.cantidadAComprar <= 0) {
      this.resultadoVerificacion = 'Debes ingresar una cantidad válida.';
      return;
    }

    if (!this.direccionAComprar.trim()) {
      this.resultadoVerificacion = 'Debes ingresar una dirección de entrega.';
      return;
    }

    if (this.cantidadAComprar > this.refrescoAComprar.cantidad) {
      this.resultadoVerificacion = `No hay suficiente stock. Solo quedan ${this.refrescoAComprar.cantidad} unidades.`;
      return;
    }

    const compra = {
      id_articulo: this.refrescoAComprar._id,
      nombre: this.refrescoAComprar.nombre,
      cantidad: this.cantidadAComprar,
      direccion: this.direccionAComprar,
      id_cliente: this.idVerificar
    };

    this.compraService.createCompra(this.idVerificar, compra).subscribe({
      next: () => {
        this.actualizarRefrescos();
        this.reiniciarPagina();
      },
      error: (error) => {
        this.resultadoVerificacion = `Error al realizar la compra: ${error.error.message}`;
        this.reiniciarPagina();
      }
    });
  }

  actualizarRefrescos(): void {
    
    const refrescoActualizado = {
      nombre: this.refrescoAComprar.nombre,
      marca: this.refrescoAComprar.marca,
      sabor: this.refrescoAComprar.sabor,
      volumen: this.refrescoAComprar.volumen,
      tipoEnvase: this.refrescoAComprar.tipoEnvase,
      cantidad: this.refrescoAComprar.cantidad - this.cantidadAComprar,
      precio: this.refrescoAComprar.precio
    };

    this.compraService.actualizarRefresco(this.idVerificar, this.refrescoAComprar._id, refrescoActualizado).subscribe({
      next: () => {
        console.log(refrescoActualizado.cantidad);
        this.refrescoAComprar = null;
        this.cantidadAComprar = 0;
        this.direccionAComprar = '';
      },
      error: (error) => {
        this.resultadoVerificacion = `Error al actualizar refresco: ${error.error.message}`;
        this.reiniciarPagina();
      }
    });
  }

  // METODOS PARA BUSCAR REFRESCOS
  toggleBuscador(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return;
    }
    this.compraService.getAllRefrescos(this.idVerificar).subscribe({
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
      }
    });
  }

  buscarRefresco(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return;
    }
    if (!this.idBusqueda) {
      this.refrescoEncontrado = [];
      return;
    }

    const servicioBusqueda = /^\d/.test(this.idBusqueda)
      ? this.compraService.getRefrescoById(this.idVerificar, this.idBusqueda)
      : this.compraService.getRefrescoByNombre(this.idVerificar, this.idBusqueda);

    servicioBusqueda.subscribe({
      next: (data) => {
        this.resultadoVerificacion = '';
        this.refrescoEncontrado = Array.isArray(data) ? data : (data ? [data] : []);
      },
      error: () => {
        this.refrescoEncontrado = [];
      }
    });
  }

  // METODOS PARA VER COMPRAS DEL USUARIO
  toggleCompras(): void {
    if (this.mostrarComprasRealizadas) {
      this.mostrarComprasRealizadas = false;
      this.comprasRealizadas = [];
    } else {
      this.verComprasRealizadas();
    }
  }

  verComprasRealizadas(): void {
    if (!this.idVerificar) {
      this.resultadoVerificacion = 'Debe ingresar un ID de usuario válido';
      return;
    }

    this.compraService.getCompraById(this.idVerificar).subscribe({
      next: (data) => {
        this.comprasRealizadas = data;
        this.mostrarComprasRealizadas = true;
        this.resultadoVerificacion = '';
      },
      error: (error) => {
        this.resultadoVerificacion = `Error al obtener las compras: ${error.error.message}`;
        this.comprasRealizadas = [];
        this.mostrarComprasRealizadas = true;
      }
    });
  }

  eliminarCompra(compra: any): void {
  
    this.compraService.deleteCompra(this.idVerificar, compra._id).subscribe({
      next: () => {
        this.resultadoVerificacion = 'Compra eliminada exitosamente.';
        this.comprasRealizadas = this.comprasRealizadas.filter(c => c._id !== compra._id);
      },
      error: (error) => {
        this.resultadoVerificacion = `Error al eliminar la compra: ${error.error.message}`;
      }
    });
  }
  

}
