import { Routes } from '@angular/router';
import { Portfolio } from './pages/portfolio/portfolio';

export const routes: Routes = [
  {
    path: '',
    component: Portfolio,
    title: 'Portfolio | Artist Showcase',
  },
];