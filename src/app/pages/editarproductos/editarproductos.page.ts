import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-editarproductos',
  templateUrl: './editarproductos.page.html',
  styleUrls: ['./editarproductos.page.scss'],
})
export class EditarproductosPage implements OnInit {
  productoRecibido: any = {
    foto: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    activo: '',
  }

  constructor(private db: DbService, private router: Router, private activedroute: ActivatedRoute) {
    this.activedroute.queryParams.subscribe(res => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.productoRecibido = this.router.getCurrentNavigation()?.extras?.state?.['productoEnviado'];
        this.productoRecibido.precio = Number(this.productoRecibido.precio);
        this.productoRecibido.stock = Number(this.productoRecibido.stock);
      }
    })
  }

  ngOnInit() {
  }

  modificar(){
    this.db.ModificarProducto(this.productoRecibido.id_producto, this.productoRecibido.nombre,this.productoRecibido.descripcion, this.productoRecibido.precio, this.productoRecibido.stock, this.productoRecibido.activo, this.productoRecibido.foto);

    this.router.navigate(['/adminproductos'])
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    this.productoRecibido.foto = image.webPath;
  };

  validarPrecio(event: any) {
    const valor = event.target.value;
    const numeroEntero = Math.floor(Math.abs(Number(valor)));
    this.productoRecibido.precio = numeroEntero;
    
    if (isNaN(this.productoRecibido.precio)) {
      this.productoRecibido.precio = 0;
    }
  }

  validarStock(event: any) {
    const valor = event.target.value;
    const numeroEntero = Math.floor(Math.abs(Number(valor)));
    this.productoRecibido.stock = numeroEntero;
    
    if (isNaN(this.productoRecibido.stock)) {
      this.productoRecibido.stock = 0;
    }
  }

}
