import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Portfolio } from './pages/portfolio/portfolio';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home | Artist Showcase',
  },
  {
    path: 'portfolio',
    component: Portfolio,
    title: 'Portfolio | Artist Showcase',
  },
];