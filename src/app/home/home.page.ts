import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  arregloProductos: any 
  arregloProductosActivos: any; 
  cantidadProductosCarrito: number = 0;
  productosFiltrados: any[] = [];
  IsLoggedIn: boolean = false

  constructor(
    private router: Router,
    private db: DbService,
    private carritoService: CarritoService
  ) {
    
    this.carritoService.carrito$.subscribe(items => {
      if (this.IsLoggedIn) { //
        this.cantidadProductosCarrito = items.reduce((total, item) => total + item.cantidad, 0); //
      } else { //
        this.cantidadProductosCarrito = 0; //
      }
    });
  }

  ngOnInit() {
    this.db.dbState().subscribe(data => {
      if (data) {
        this.db.fetchProducto().subscribe(res => {
          this.arregloProductos = res; // Mantén todos los productos en este arreglo
          // Filtrar productos activos
          this.arregloProductosActivos = this.arregloProductos.filter((producto: { activo: string; }) => producto.activo === 'Activo');
        });
      }
    });
  }



  filtrarProductos(terminoBusqueda: string) {
    return this.arregloProductosActivos.filter((producto: any) => 
      producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      producto.categoria.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
  }

  buscarProductos(event: any) {
    const terminoBusqueda = event.target.value;
    this.productosFiltrados = terminoBusqueda 
      ? this.filtrarProductos(terminoBusqueda)
      : this.arregloProductosActivos;
  }

  visualizar(item: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        productoEnviado: item
      }
    };
    this.router.navigate(['/detalleitem'], navigationExtras);
  }

  
}