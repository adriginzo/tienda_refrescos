import { Component } from '@angular/core';
import { ListaRefrescosComponent } from './componentes/lista-refrescos/lista-refrescos.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ListaRefrescosComponent], // Importa el componente
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'tienda-refrescos';
}