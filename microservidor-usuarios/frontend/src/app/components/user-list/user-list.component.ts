import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';  // Asegúrate de la ruta correcta
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];  // Inicializa la variable 'users' como un array vacío

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();  // Llamada al método para cargar usuarios
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;  // Asigna los datos a 'users' cuando la respuesta sea exitosa
      },
      (error) => {
        console.error('Error al cargar los usuarios', error);  // Maneja cualquier error
      }
    );
  }
}
