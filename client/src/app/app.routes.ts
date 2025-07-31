import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { DashboardPage } from './pages/dashboard/dashboard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, // Default route
    { path: 'login' , component: LoginPage},
    { path: 'register', component: RegisterPage},
      { path: 'dashboard', component: DashboardPage ,canActivate: [AuthGuard] }

];
