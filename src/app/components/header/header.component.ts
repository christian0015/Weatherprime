import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'Weatherprime';
  menuActive = false;
  
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
