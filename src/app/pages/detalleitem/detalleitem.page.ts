import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { AlertController, ToastController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-detalleitem',
  templateUrl: './detalleitem.page.html',
  styleUrls: ['./detalleitem.page.scss'],
})
export class DetalleitemPage implements OnInit {
  productoRecibido !: any
  cantidad: number = 1;
  tallaSeleccionada: string = '';
  arregloTalla!: any
  cantidadProductosCarrito: number = 0;
  precioCLP: number = 0;
  precioUSD: number = 0;
  isOnline: boolean = true;

  constructor(
    private db: DbService, 
    private router: Router, 
    private activedroute: ActivatedRoute,
    private alertController: AlertController,  
    private carrito: CarritoService,
    private currencyService: CurrencyService
  ) {
    this.carrito.carrito$.subscribe(items => {
      this.cantidadProductosCarrito = items.reduce((total, item) => total + item.cantidad, 0);
    });
    this.checkNetworkStatus();
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus();
    this.isOnline = status.connected;
    
    Network.addListener('networkStatusChange', status => {
      this.isOnline = status.connected;
      if (this.isOnline && this.precioUSD) {
        this.convertirMoneda(this.precioUSD);
      }
    });
  }

  ngOnInit() {
    this.activedroute.queryParamMap.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.productoRecibido = this.router.getCurrentNavigation()?.extras?.state?.['productoEnviado'];
        this.precioUSD = Number(this.productoRecibido.precio);
        if (this.isOnline) {
          this.convertirMoneda(this.precioUSD);
        } else {
          
          this.precioCLP = this.precioUSD * 850;
        }
      }

      if (this.productoRecibido.stock <= 0) {
        this.mostrarAlerta('Sin stock', 'Este producto no está disponible actualmente.');
        this.cantidad = 0;
      }

    });

    this.db.dbState().subscribe(data=>{
      if(data){
        this.db.fetchTalla().subscribe(res=>{
          this.arregloTalla = res;
        })
      }
    })
  }

  convertirMoneda(precioUSD: number) {
    this.currencyService.convertirUSDaCLP(precioUSD).subscribe({
      next: (response: any) => {
        const tasaCLP = response.data.CLP.value;
        this.precioCLP = precioUSD * tasaCLP;
      },
      error: (error) => {
        console.error('Error en la conversión:', error);
        
        this.precioCLP = precioUSD * 850;
      }
    });
  }

  restarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  sumarCantidad() {
    // Validar stock disponible
    if (this.productoRecibido.stock <= 0) {
      this.mostrarAlerta('Error', 'No hay stock disponible');
      return;
    }

    if (this.cantidad >= this.productoRecibido.stock) {
      this.mostrarAlerta('Error', `Solo hay ${this.productoRecibido.stock} unidades disponibles`);
      return;
    }

    if (this.cantidad < 5) {
      this.cantidad++;
    } else {
      this.mostrarAlerta('Límite alcanzado', 'No puedes agregar más de 5 unidades de este producto.');
    }
  }

  async agregarAlCarrito(producto: any) {
    // Validar stock antes de agregar
    if (producto.stock <= 0) {
      this.mostrarAlerta('Error', 'No hay stock disponible');
      return;
    }

    if (!this.tallaSeleccionada) {
      this.mostrarAlerta('Error', 'Por favor seleccione una talla antes de agregar al carrito.');
      return;
    }

    const productosEnCarrito = await this.carrito.obtenerCantidadProducto(producto.id_producto, this.tallaSeleccionada);
    const cantidadTotal = productosEnCarrito + this.cantidad;

    // Validar que la cantidad total no exceda el stock disponible
    if (cantidadTotal > producto.stock) {
      this.mostrarAlerta('Stock insuficiente', `Solo hay ${producto.stock} unidades disponibles. Ya tienes ${productosEnCarrito} en el carrito.`);
      return;
    }

    if (cantidadTotal > 5) {
      this.mostrarAlerta('Límite excedido', 'No puedes agregar más de 5 unidades de este producto al carrito.');
      return;
    }

    const productoConDetalles = {
      ...producto,
      talla: this.tallaSeleccionada,
      cantidad: this.cantidad,
      stock: this.productoRecibido.stock
    };

    await this.carrito.agregarProducto(productoConDetalles);
    this.mostrarAlerta('Éxito', 'Producto agregado al carrito');
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  seleccionarTalla(talla: string) {
    this.tallaSeleccionada = talla;
  }

  isTallaSeleccionada(talla: string): boolean {
    return this.tallaSeleccionada === talla;
  }
}