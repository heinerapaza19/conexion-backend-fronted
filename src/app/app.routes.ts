import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio';
import { Citas } from './pages/citas/citas';
import { Medicos } from './pages/medicos/medicos';
import { Pacientes } from './pages/paciente/paciente';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, 
  { path: 'inicio', component: InicioComponent},
  { path: 'citas', component: Citas },
  { path: 'medicos', component: Medicos },
  { path: 'pacientes', component: Pacientes }
  
];
