import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  arregloProductos: any = [

    {
      id_producto: '',
      nombre: '',
      descripcion: '',
      categoria: '',
      precio: '',
      stock: '',
      foto : ''

    }

  ]
  constructor(private db : DbService) { }

  ngOnInit() {
    this.db.dbState().subscribe(data =>{
      if(data){
        this.db.fetchProducto().subscribe(res=>{
          this.arregloProductos = res;
        })
      }
    })
  }

  getCategorias(): string[] {
    return Array.from(new Set(
      this.arregloProductos
        .map((p: { categoria: any; }) => p.categoria)
        .filter((categoria: string) => categoria !== '')
    ));
  }

  getProductosPorCategoria(categoria: string) {
    return this.arregloProductos.filter((producto: any) => producto.categoria === categoria);
  }

}
