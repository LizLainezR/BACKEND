import { Routes } from '@angular/router';
import { LoginComponent } from './Sign/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { autoLoginGuard } from './guard/authen.guard';
import { ProfileComponent } from './page/profile/profile.component';
import { PuntoVentasComponent } from './page/Employee/punto-ventas/punto-ventas.component';
import { CatalogoComponent } from './page/Employee/catalogo/catalogo.component';

export const routes: Routes = [
    {path:"login",  component: LoginComponent, canActivate:[autoLoginGuard]},
    {path:"dashboard",  component: DashboardComponent },
    {path:"profile",  component: ProfileComponent },
    {path:"punto-ventas",  component: PuntoVentasComponent },
    {path:"catalogo",  component: CatalogoComponent },
    {path: '', pathMatch: 'full', redirectTo: '/login'}

];
