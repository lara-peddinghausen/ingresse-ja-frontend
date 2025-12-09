import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { AuthGuard } from '../auth.guard';
import { UsuarioComponent } from './componentes/cadastro/usuario/usuario.component';
import { EventoComponent } from './componentes/cadastro/evento/evento.component';
import { CupomComponent } from './componentes/cadastro/cupom/cupom.component'; 
import { IngressoComponent } from './componentes/cadastro/ingresso/ingresso.component';
export const routes: Routes = [
    // ROTAS PRIMÁRIAS (Carregam no <router-outlet>)
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'cadastro/usuario', component: UsuarioComponent},
    { path: 'cadastro/evento', component: EventoComponent, canActivate: [AuthGuard] },

    { path: 'cadastro/cupom', component: CupomComponent, canActivate: [AuthGuard] },
    { path: 'cadastro/ingresso', component: IngressoComponent, canActivate: [AuthGuard] },
];