import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-agregardireccion',
  templateUrl: './agregardireccion.page.html',
  styleUrls: ['./agregardireccion.page.scss'],
})
export class AgregardireccionPage implements OnInit {
  usuarioRecibido: any = {
    region: '',
    comuna: '',
    direccion: ''
  };

  arregloRegion: any = [
    {
      id_region: '',
      nombre: '',
    }
  ]

  arregloComuna: any = [
    {
      id_comuna: '',
      nombre: '',
      region:''
    }
  ]

  constructor(private router: Router, private db: DbService, private activedroute: ActivatedRoute, private alertController: AlertController) { 
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado']
      }
    })
  }

  ngOnInit() {
    this.db.dbState().subscribe(data=>{
      if(data){
        this.db.fetchRegion().subscribe(res=>{
          this.arregloRegion = res
        })
      }
    })

    this.db.dbState().subscribe(data1=>{
      if(data1){
        this.db.fetchComuna().subscribe(ress=>{
          this.arregloComuna = ress
        })
      }
    })
  }

  guardar(){

    if(this.usuarioRecibido.region.trim() === ''){
      this.mostrarAlertaRegion()
      return
    }

    if(this.usuarioRecibido.comuna.trim() === ''){
      this.mostrarAlertaComuna()
      return
    }

    if(this.usuarioRecibido.direccion.trim() === ''){
      this.mostrarAlertaDireccion()
      return
    }

    this.db.agregarDireccion(this.usuarioRecibido.id_usuario,this.usuarioRecibido.region,this.usuarioRecibido.comuna,this.usuarioRecibido.direccion)
    this.router.navigate(['/cuenta'])
  }

  async mostrarAlertaRegion() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, selecciona una Region.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarAlertaComuna() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, selecciona una Comuna.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarAlertaDireccion() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, agrega una Direccion.',
      buttons: ['OK']
    });
    await alert.present();
  }


}
