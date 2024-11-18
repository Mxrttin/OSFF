import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private mensajes = [
    '¡No te pierdas tu prenda favorita de OcultoStudio! 👗',
    'Tu prenda favorita te espera en OcultoStudio ✨',
    'No olvides pasar por OcultoStudio por tu prenda favorita 🛍️',
    'Tu estilo único te espera en OcultoStudio 🌟'
  ];

  constructor(
    private platform: Platform,
    private toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.programarNotificaciones();
      this.configurarListeners();
    });
  }

  private async configurarListeners() {
    // Escuchar cuando llega una notificación mientras la app está abierta
    await LocalNotifications.addListener('localNotificationReceived', (notification) => {
      this.mostrarToastEnApp(notification.body);
    });
  }

  private async mostrarToastEnApp(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ],
      cssClass: 'notification-toast'
    });
    toast.present();
  }

  private async programarNotificaciones() {
    try {
      const notificaciones = [];
      
      for(let i = 0; i < 10; i++) {
        notificaciones.push({
          title: 'OcultoStudio',
          body: this.mensajes[i % this.mensajes.length],
          id: i + 2,
          schedule: { at: new Date(Date.now() + (1000 * 60 * 3 * (i + 1))), // Cada 3 minutos
          allowWhileIdle: true, // Permitir notificaciones incluso cuando el dispositivo está inactivo
          foreground: true      // Mostrar incluso cuando la app está en primer plano
          }
        });
      }

      await LocalNotifications.schedule({
        notifications: notificaciones
      });
      
    } catch (error) {
      console.error('Error al programar notificaciones:', error);
    }
  }
}
