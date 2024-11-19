import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-agregarproductos',
  templateUrl: './agregarproductos.page.html',
  styleUrls: ['./agregarproductos.page.scss'],
})
export class AgregarproductosPage implements OnInit {

  imagen: any;
  precio: number = 0;
  nombre: string =''
  descripcion: string=''
  categorias:any
  stock: number = 0;

  arregloCategorias: any

  constructor(private toastController : ToastController, private router: Router, private alertController: AlertController,private db : DbService) { }

  ngOnInit() {
    this.db.dbState().subscribe(data=>{
      if(data){
        this.db.fetchCategoria().subscribe(res=>{
          this.arregloCategorias = res;
        })
      }
    })
  }

  guardar(){

    if(this.precio <= 0){  
      this.userAlert()
      return
    }

    if(this.stock <= 0){  
      this.stockCeroAlert
      return
    }

    if(this.nombre === ''){
      this.nombreAlert()
      return
    }

    if(this.descripcion === ''){
      this.descripcionAlert()
      return
    }

    if(!this.categorias){
      this.categoriaAlert()
      return
    }

    if( this.stock == null){
      this.stockAlert()
      return
    }

    if( this.precio == null){
      this.precioAlert()
      return
    }

    if( this.imagen == null){
      this.imagenAlert()
      return
    }

    this.registroToast('bottom')
    this.db.insertarProducto(this.nombre,this.descripcion,this.categorias,this.imagen,this.precio.toString(),this.stock.toString())
    this.router.navigate(['/adminproductos'])
  }

  validarPrecio(event: any) {
    const valor = event.target.value;
    // Elimina decimales y números negativos
    const numeroEntero = Math.floor(Math.abs(Number(valor)));
    this.precio = numeroEntero;
    
    // Si el valor no es un número válido, lo establece en 0
    if (isNaN(this.precio)) {
      this.precio = 0;
    }
  }

  validarStock(event: any) {
    const valor = event.target.value;
    // Elimina decimales y números negativos
    const numeroEntero = Math.floor(Math.abs(Number(valor)));
    this.stock = numeroEntero;
    
    // Si el valor no es un número válido, lo establece en 0
    if (isNaN(this.stock)) {
      this.stock = 0;
    }
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imagen = image.webPath;

  };

  async userAlert() {
    const alert = await this.alertController.create({
      header: "",
      message: "Precio no puede ser menor o igual a 0",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async imagenAlert() {
    const alert = await this.alertController.create({
      header: "",
      message: "Por favor agregar una imagen al producto",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async stockAlert() {
    const alert = await this.alertController.create({
      header: "",
      message: "Stock no puede estar vacio",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async precioAlert() {
    const alert = await this.alertController.create({
      header: "",
      message: "Precio no puede estar vacio",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async stockCeroAlert() {
    const alert = await this.alertController.create({
      header: "",
      message: "Por favor agregar stock al producto",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async nombreAlert() {
    const alert = await this.alertController.create({
      header: "",
      message: "Por favor agregar un nombre para el producto",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async descripcionAlert() {
    const alert = await this.alertController.create({
      header: "",
      message: "Por favor agregar una descripcion al producto",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async categoriaAlert() {
    const alert = await this.alertController.create({
      header: "",
      message: "Por favor agregar una categoria al producto",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async registroToast(position:'bottom') {
    const toast = await this.toastController.create({
      message: 'Producto agregado con exito',
      icon: 'checkmark-outline',
      duration: 2500,
      position: position,
    });

    await toast.present();
  }

}