import { Component } from '@angular/core';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ListaUsuariosComponent], // Importa el componente
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'tienda-refrescos';
}