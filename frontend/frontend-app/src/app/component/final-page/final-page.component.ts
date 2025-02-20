import { Component } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-final-page',
  imports: [],
  templateUrl: './final-page.component.html',
  styleUrl: './final-page.component.css'
})
export class FinalPageComponent {
  constructor(private router: Router) {}

  quitter() {
    this.router.navigate(['/']); // 🏠 Retour à l'accueil
  }

}
