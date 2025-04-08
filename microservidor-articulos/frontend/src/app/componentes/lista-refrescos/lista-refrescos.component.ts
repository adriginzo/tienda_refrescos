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
  refrescos: any[] = []; // Lista completa de refrescos
  refrescosFiltrados: any[] = []; // Lista filtrada de refrescos
  refrescoEncontrado: any[] = []; 
  submittedModificacion: boolean = false; // Controla si el formulario de modificación ha sido enviado
  mostrarFormularioModificacion: boolean = false;
  refrescoModificar: any = null;
  mostrarFormulario: boolean = false;
  mostrarLista: boolean = false;
  mostrarBuscador: boolean = false; // Controla si el buscador está visible
  idBusqueda: string = ''; // ID de búsqueda
  filtroEnvase: string = ''; // Valor seleccionado en el desplegable
  nuevoRefresco: any = {
    nombre: '',
    marca: '',
    sabor: '',
    volumen: null,
    tipoEnvase: 'lata',
    cantidad: null,
    precio: null
  };
  submitted: boolean = false; // Variable para controlar si el formulario ha sido enviado


  idVerificar: string = '';
  resultadoVerificacion: string = '';

  constructor(private refrescosService: RefrescosService) { }

  ngOnInit(): void {
    // No cargamos los refrescos automáticamente al iniciar
  }


  // Metodo para verificar ID
  comprobarRole(roleRequerido: string, idVerificar: string, callback: Function, ...args: any[]) {
    if (!idVerificar) {
      this.resultadoVerificacion = 'Por favor ingrese un ID';
      return;
    }
  
    this.refrescosService.verificarIdExistente(idVerificar).subscribe(
      (existe: boolean) => {
        if (existe) {
          this.refrescosService.obtenerRolePorId(idVerificar).subscribe(
            (role: string) => {
              if (role === roleRequerido) {
                callback(...args); 
              } else {
                this.resultadoVerificacion = `El usuario no tiene permisos de ${roleRequerido}`;
              }
            },
            (error) => {
              this.resultadoVerificacion = 'Error al obtener el rol';
            }
          );
        } else {
          this.resultadoVerificacion = `El ID ${idVerificar} NO existe.`;
        }
      },
      (error) => {
        this.resultadoVerificacion = 'Error al verificar el ID';
      }
    );
  }


  

  // Método para obtener todos los refrescos
  obtenerRefrescos(): void {
    this.refrescosService.obtenerRefrescos().subscribe(
      (data) => {
        // Ordena la lista de refrescos por nombre
        this.refrescos = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        this.refrescosFiltrados = this.refrescos; // Inicializa refrescosFiltrados
      },
      (error) => {
        console.error('Error al obtener los refrescos:', error);
      }
    );
  }

  // Método para filtrar los refrescos según el tipo de envase
  filtrarRefrescos(): void {
    if (this.filtroEnvase) {
      // Filtra los refrescos que coincidan con el tipo de envase seleccionado
      this.refrescosFiltrados = this.refrescos.filter(
        (refresco) => refresco.tipoEnvase === this.filtroEnvase
      );
    } else {
      // Si no hay filtro, muestra todos los refrescos
      this.refrescosFiltrados = this.refrescos;
    }
  }

  // Método para borrar un refresco por su ID
  borrarRefresco(id: string): void {
    this.refrescosService.borrarRefresco(id).subscribe(
      () => {
        // Eliminación exitosa: actualiza la lista de refrescos
        this.refrescos = this.refrescos.filter(refresco => refresco._id !== id);
        this.filtrarRefrescos(); // Aplica el filtro después de borrar
        console.log('Refresco borrado correctamente');
      },
      (error) => {
        console.error('Error al borrar el refresco:', error);
      }
    );
  }
 
  // Método para alternar la visibilidad del formulario
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.submitted = false; // Reinicia el estado de envío al mostrar/ocultar el formulario
  }

  // Método para alternar la visibilidad de la lista
  toggleLista(): void {
    this.mostrarLista = !this.mostrarLista;
    if (this.mostrarLista && this.refrescos.length === 0) {
      this.obtenerRefrescos(); // Cargar los refrescos solo si la lista está vacía
    }
  }

  // Método para agregar un nuevo refresco
  agregarRefresco(form: any): void {
    this.submitted = true; // Marcar como enviado

    if (form.valid) {
      this.refrescosService.agregarRefresco(this.nuevoRefresco).subscribe(
        (data) => {
          console.log('Refresco agregado correctamente:', data);
          this.obtenerRefrescos(); // Actualizar la lista de refrescos
          this.mostrarFormulario = false; // Ocultar el formulario
          this.nuevoRefresco = { // Reiniciar el formulario
            nombre: '',
            marca: '',
            sabor: '',
            volumen: null,
            tipoEnvase: 'lata',
            cantidad: null,
            precio: null
          };
          this.submitted = false; // Reiniciar el estado de envío
        },
        (error) => {
          console.error('Error al agregar el refresco:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  comprarRefresco(refresco: any): void {
    if (refresco.cantidad > 0) {
      refresco.cantidad -= 1; // Restar 1 a la cantidad en el frontend
      this.refrescosService.actualizarRefresco(refresco._id, { cantidad: refresco.cantidad }).subscribe(
        () => {
          console.log('Refresco comprado correctamente');
        },
        (error) => {
          console.error('Error al comprar el refresco:', error);
          refresco.cantidad += 1; // Revertir el cambio en caso de error
        }
      );
    }
  }

  anadirRefresco(refresco: any): void {
    refresco.cantidad += 1; // Sumar 1 a la cantidad en el frontend
    this.refrescosService.actualizarRefresco(refresco._id, { cantidad: refresco.cantidad }).subscribe(
      () => {
        console.log('Refresco añadido correctamente');
      },
      (error) => {
        console.error('Error al añadir el refresco:', error);
        refresco.cantidad -= 1; // Revertir el cambio en caso de error
      }
    );
  }

  // Método para alternar la visibilidad del buscador
  toggleBuscador(): void {
    this.mostrarBuscador = !this.mostrarBuscador;
    this.idBusqueda = ''; // Reiniciar el ID de búsqueda
    this.refrescoEncontrado = []; // Reiniciar el refresco encontrado
  }

  buscarRefrescoPorId(): void {
    if (this.idBusqueda) {
      if (/^\d/.test(this.idBusqueda)) {
        // Buscar por ID
        this.refrescosService.buscarRefrescoPorId(this.idBusqueda).subscribe(
          (data) => {
            console.log("Respuesta de la API (por ID):", data);
            this.refrescoEncontrado = data ? [data] : [];
          },
          (error) => {
            console.error("Error al buscar el refresco por ID:", error);
            this.refrescoEncontrado = [];
          }
        );
      } else {
        // Buscar por nombre
        this.refrescosService.buscarRefrescoPorNombre(this.idBusqueda).subscribe(
          (data) => {
            console.log("Respuesta de la API (por nombre):", data); // Verificamos qué devuelve la API
            if (Array.isArray(data)) {
              this.refrescoEncontrado = data;
            } else if (data) {
              this.refrescoEncontrado = [data];
            } else {
              this.refrescoEncontrado = [];
            }
          },
          (error) => {
            console.error("Error al buscar el refresco por nombre:", error);
            this.refrescoEncontrado = [];
          }
        );
      }
    } else {
      this.refrescoEncontrado = [];
    }
  }


  // Método para mostrar el formulario de modificación
  mostrarFormularioModificar(refresco: any): void {
    this.refrescoModificar = { ...refresco }; // Copia los valores del refresco
    this.mostrarFormularioModificacion = true; // Muestra el formulario
  }

  // Método para cancelar la modificación
  cancelarModificacion(): void {
    this.mostrarFormularioModificacion = false; // Oculta el formulario
    this.refrescoModificar = null; // Reinicia el refresco a modificar
  }

  // Método para modificar el refresco
  modificarRefresco(form: any): void {
    this.submittedModificacion = true; // Marcar como enviado

    if (form.valid) {
      this.refrescosService.actualizarRefresco(this.refrescoModificar._id, this.refrescoModificar).subscribe(
        (data) => {
          console.log('Refresco modificado correctamente:', data);
          this.obtenerRefrescos(); // Actualiza la lista de refrescos
          this.mostrarFormularioModificacion = false; // Oculta el formulario
          this.refrescoModificar = null; // Reinicia el refresco a modificar
          this.submittedModificacion = false; // Reinicia el estado de envío
        },
        (error) => {
          console.error('Error al modificar el refresco:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
  
}