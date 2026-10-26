
import { Routes } from '@angular/router';
import { Portfolio } from './pages/portfolio/portfolio';
import { About } from './pages/about/about';

export const routes: Routes = [
  {
    path: '',
    component: Portfolio,
    title: 'Portfolio | Artist Showcase',
  },
  {
    path: 'about',
    component: About,
    title: 'About | Artist Showcase',
  },
];
