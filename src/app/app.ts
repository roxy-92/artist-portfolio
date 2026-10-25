
import { Component, signal } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  menuOpen = signal(false);

  toggleMenu() {
  this.menuOpen.update(open => !open);
}

  closeMenu() {
    this.menuOpen.set(false);
  }
}
