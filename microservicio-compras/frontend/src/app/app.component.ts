import { Component } from '@angular/core';
import { ListaRefrescosComponent } from './components/lista-refrescos/lista-refrescos.component';
import { ComprasListComponent } from './components/compras-list/compras-list.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ListaRefrescosComponent, ComprasListComponent], // Importa el componente
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'tienda-refrescos';
}