import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent {
  formData = {
    genre: '',
    age: null,
    nationalite: '',
    niveauEtudes: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    console.log('Données du formulaire :', this.formData);

    // Vérifier si tous les champs sont remplis
    if (!this.formData.genre || !this.formData.age || !this.formData.nationalite || !this.formData.niveauEtudes) {
      console.error('Tous les champs sont obligatoires.');
      return;
    }

    // Préparer l'objet à envoyer
    const body = {
      genre: this.formData.genre,
      age: this.formData.age,
      nationalite: this.formData.nationalite,
      niveauEtudes: this.formData.niveauEtudes
    };

    console.log('Envoi des données...', body);

    // Envoi de la requête POST vers l'API
    this.http
      .post('/api/submitForm', body, { withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log('Réponse serveur :', response);
          // Redirection après validation
          this.router.navigate(['/forces']);
        },
        error: (err) => {
          console.error('Erreur lors de l’envoi des données :', err);
        },
        complete: () => console.log('Requête terminée')
      });
  }
}
