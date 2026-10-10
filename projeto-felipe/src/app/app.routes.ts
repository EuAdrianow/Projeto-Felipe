import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contato } from './pages/contato/contato';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';

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
    path: '**',
    component: NotFound
}
];
