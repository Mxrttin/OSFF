import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'adminprincipal',
    loadChildren: () => import('./pages/adminprincipal/adminprincipal.module').then( m => m.AdminprincipalPageModule)
  },
  {
    path: 'adminproductos',
    loadChildren: () => import('./pages/adminproductos/adminproductos.module').then( m => m.AdminproductosPageModule)
  },
  {
    path: 'adminusuarios',
    loadChildren: () => import('./pages/adminusuarios/adminusuarios.module').then( m => m.AdminusuariosPageModule)
  },
  {
    path: 'agregardireccion',
    loadChildren: () => import('./pages/agregardireccion/agregardireccion.module').then( m => m.AgregardireccionPageModule)
  },
  {
    path: 'agregarproductos',
    loadChildren: () => import('./pages/agregarproductos/agregarproductos.module').then( m => m.AgregarproductosPageModule)
  },
  {
    path: 'infousuario',
    loadChildren: () => import('./pages/infousuario/infousuario.module').then( m => m.InfousuarioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'modificarperfil',
    loadChildren: () => import('./pages/modificarperfil/modificarperfil.module').then( m => m.ModificarperfilPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'editarproductos',
    loadChildren: () => import('./pages/editarproductos/editarproductos.module').then( m => m.EditarproductosPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'detalleitem',
    loadChildren: () => import('./pages/detalleitem/detalleitem.module').then( m => m.DetalleitemPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'adminpedidos',
    loadChildren: () => import('./pages/adminpedidos/adminpedidos.module').then( m => m.AdminpedidosPageModule)
  },
  {
    path: 'detallepedido',
    loadChildren: () => import('./pages/detallepedido/detallepedido.module').then( m => m.DetallepedidoPageModule)
  },
  {
    path: 'cambiarpassword',
    loadChildren: () => import('./pages/cambiarpassword/cambiarpassword.module').then( m => m.CambiarpasswordPageModule)
  },
  {
    path: 'pedidosusuarios',
    loadChildren: () => import('./pages/pedidosusuarios/pedidosusuarios.module').then( m => m.PedidosusuariosPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'admincategorias',
    loadChildren: () => import('./pages/admincategorias/admincategorias.module').then( m => m.AdmincategoriasPageModule)
  },
  {
    path: 'agregarcategoria',
    loadChildren: () => import('./pages/agregarcategoria/agregarcategoria.module').then( m => m.AgregarcategoriaPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
