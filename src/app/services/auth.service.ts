import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private nativeStorage: NativeStorage, private router: Router) { }


  async verificarSesion() {
    try {
      const userId = await this.nativeStorage.getItem('userId');
      const rolId = await this.nativeStorage.getItem('rolId');
      
      if (userId) {
        // Redirigir según el rol
        if (rolId === '1') {
          await this.router.navigate(['/adminprincipal']);
        } else {
          await this.router.navigate(['/home']);
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async cerrarSesion() {
    await this.nativeStorage.clear();
    await this.router.navigate(['/login']);
  }

}
