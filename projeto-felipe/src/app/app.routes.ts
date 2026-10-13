import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contato } from './pages/contato/contato';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { Ofertas } from './pages/ofertas/ofertas';
import { Produtos } from './pages/produtos/produtos';
import { Hardwares } from './pages/hardwares/hardwares';
import { ComputadoresGamer } from './pages/computadores-gamer/computadores-gamer';
import { Monitores } from './pages/monitores/monitores';
import { Perifericos } from './pages/perifericos/perifericos';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'contato',
    component: Contato
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'ofertas',
    component: Ofertas
  },
  {
    path: 'produtos',
    component: Produtos
  },
  {
    path: 'hardwares',
    component: Hardwares
  },
  {
    path: 'computadores-gamer',
    component: ComputadoresGamer
  },
  {
    path: 'monitores',
    component: Monitores
  },
  {
    path: 'perifericos',
    component: Perifericos
  },
  {
    path: '**',
    component: NotFound
  }
];
