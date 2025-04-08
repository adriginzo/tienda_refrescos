import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CompraService } from '../../services/compras.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-compras-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compras-list.component.html',
  styleUrls: ['./compras-list.component.css']
})
export class ComprasListComponent implements OnInit {

  compras: any[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {
    this.loadCompras();
  }

  loadCompras(): void {
    this.isLoading = true;
    this.error = null;

    this.compraService.getCompras().subscribe(
      (data) => {
        this.compras = data;
        this.isLoading = false;
      },
    );
  }
}
