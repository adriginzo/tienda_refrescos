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
  newUser = { role: 'Cliente' }; // Valor por defecto
  userIdToDelete = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
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
        this.loadUsers(); // Recargar la lista
        this.showCreateForm = false; // Ocultar formulario
        this.newUser = { role: 'Cliente' }; // Resetear formulario
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
        this.loadUsers(); // Recargar la lista
        this.showDeleteForm = false; // Ocultar formulario
        this.userIdToDelete = ''; // Resetear el campo
      },
      (error) => {
        console.error('Error al borrar usuario:', error);
      }
    );
  }
}