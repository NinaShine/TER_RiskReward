import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-final-page',
  imports: [],
  templateUrl: './final-page.component.html',
  styleUrl: './final-page.component.css'
})
export class FinalPageComponent {
  constructor(private router: Router, private http: HttpClient) {}

  quitter() {
    this.router.navigate(['/']);
  }

}
