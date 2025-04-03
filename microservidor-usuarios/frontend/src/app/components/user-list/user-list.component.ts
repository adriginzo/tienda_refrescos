import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';  // Asegúrate de la ruta correcta
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[] = [];  // Array para almacenar los usuarios
  isLoading: boolean = true;  // Indicador de carga
  error: string = '';  // Mensaje de error en caso de que ocurra

  constructor(private userService: UserService) { }

  ngOnInit(): void {
   
  }

  
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Error al cargar los usuarios';
        this.isLoading = false;
      }
    );
  }
}
