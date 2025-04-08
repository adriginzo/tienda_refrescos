import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  showCreateForm = false;
  showDeleteForm = false;
  newUser = { role: 'Cliente' };
  userIdToDelete = '';
  
  // Propiedades de autenticación
  authenticated = false;
  inputUserId = '';
  authError = '';
  isAdmin = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // No cargamos datos inicialmente
  }

  checkUser(): void {
    if (!this.inputUserId.trim()) {
      this.authError = 'Por favor ingrese un ID válido';
      return;
    }

    this.userService.getUserById(this.inputUserId).subscribe(
      (user) => {
        if (user && user.role === 'Administrador') {
          this.authenticated = true;
          this.isAdmin = true;
          this.loadUsers();
        } else {
          this.authError = 'Acceso denegado. Se requieren privilegios de administrador';
        }
      },
      (error) => {
        this.authError = 'Usuario no encontrado o error en el servidor';
        console.error('Error al verificar usuario:', error);
      }
    );
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al cargar los usuarios', error);
      }
    );
  }

  createUser(): void {
    this.userService.createUser(this.newUser).subscribe(
      (response) => {
        console.log('Usuario creado:', response);
        this.loadUsers();
        this.showCreateForm = false;
        this.newUser = { role: 'Cliente' };
      },
      (error) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

  deleteUser(): void {
    if (!this.userIdToDelete) {
      console.error('No se ha proporcionado un ID de usuario');
      return;
    }

    this.userService.deleteUser(this.userIdToDelete).subscribe(
      () => {
        console.log('Usuario borrado exitosamente');
        this.loadUsers();
        this.showDeleteForm = false;
        this.userIdToDelete = '';
      },
      (error) => {
        console.error('Error al borrar usuario:', error);
      }
    );
  }
}