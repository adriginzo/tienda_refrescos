import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  selectedUsuario: any = null;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    
  }

  loadUsuarios(): void {
    this.usuariosService.getAllUsuarios().subscribe(
      (data) => this.usuarios = data,
      (error) => console.error('Error cargando usuarios:', error)
    );
  }

  selectUsuario(usuario: any): void {
    this.selectedUsuario = { ...usuario };
  }

  deleteUsuario(id: string): void {
    if (confirm('¿Seguro de eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(id).subscribe(
        () => {
          this.loadUsuarios();
          this.selectedUsuario = null;
        },
        (error) => console.error('Error eliminando usuario:', error)
      );
    }
  }
}