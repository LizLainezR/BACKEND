import { Routes } from '@angular/router';
import { LoginComponent } from './Sign/login.component';
import { autoLoginGuard, authenticatedGuard } from './guard/auth.guard';
import { DashboardComponent } from './page/dashboard/dashboard.component';

export const routes: Routes = [
    {path:"login",  component: LoginComponent, canActivate:[autoLoginGuard]},
// },
    {path:"dashboard",  component: DashboardComponent },
    {path: '', pathMatch: 'full', redirectTo: '/login'}

];
