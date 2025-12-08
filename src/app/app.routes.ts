import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { AuthGuard } from '../auth.guard';
import { UsuarioComponent } from './componentes/cadastro/usuario/usuario.component';
import { EventoComponent } from './componentes/cadastro/evento/evento.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'cadastro/usuario', component: UsuarioComponent},
    { path: 'cadastro/evento', component: EventoComponent, canActivate: [AuthGuard] },
  ];
