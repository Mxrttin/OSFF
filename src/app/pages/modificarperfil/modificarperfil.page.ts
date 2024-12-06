import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-modificarperfil',
  templateUrl: './modificarperfil.page.html',
  styleUrls: ['./modificarperfil.page.scss'],
})
export class ModificarperfilPage implements OnInit {
  usuarioRecibido: any = {
    foto:'',
    nombre:'',
    apellido:'',
    rut:'',
    correo:'',
    telefono:'',
  };

  constructor(private router: Router, private db: DbService, private activedroute: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado']
      }
    })
  }

  async guardar(){

    const existeCorreo = await this.db.verificarCorreo(this.usuarioRecibido.correo, 0);
    if (existeCorreo) {
      this.presentAlert('Correo existente', 'Ya existe un usuario registrado con ese correo.');
      return;
    }


    this.db.modificarDatos(this.usuarioRecibido.id_usuario,this.usuarioRecibido.nombre,this.usuarioRecibido.apellido,this.usuarioRecibido.rut,this.usuarioRecibido.correo,this.usuarioRecibido.telefono,this.usuarioRecibido.foto)
    this.router.navigate(['/cuenta'])
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    this.usuarioRecibido.foto = image.webPath;
  };

  cancelar(){
    this.router.navigate(['/cuenta'])
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

}
