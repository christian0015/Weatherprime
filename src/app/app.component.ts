import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'weatherprime';

  ngOnInit(): void {
    AOS.init({
      duration: 800, // durée de l'animation en ms
      easing: 'ease-in-out', // type d'animation
      once: true, // si true, l'animation ne se joue qu'une fois
      mirror: false // si true, l'élément s'anime aussi en scrollant vers le haut
    });
  }
}
