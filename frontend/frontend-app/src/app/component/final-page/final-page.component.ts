import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ContexteComponent } from '../contexte/contexte.component';
import { CommonModule } from '@angular/common';

// Fonction pour ajouter les données de test à sessionStorage
function setupTestData() {
  const testData = {
    stats: {
      winners: [
        { categorie: 'risk', avg: 8, perso: 'homme' },
        { categorie: 'reward', avg: 9, perso: 'femme' },
        { categorie: 'effort', avg: 7, perso: 'vieux' }
      ],
      details: {
        "homme": [
          { cat: 'risk', avg: 8 },
          { cat: 'reward', avg: 6 },
          { cat: 'effort', avg: 7 }
        ],
        "femme": [
          { cat: 'risk', avg: 5 },
          { cat: 'reward', avg: 9 },
          { cat: 'effort', avg: 6 }
        ],
        "vieux": [
          { cat: 'risk', avg: 3 },
          { cat: 'reward', avg: 4 },
          { cat: 'effort', avg: 7 }
        ],
        "enfant": [
          { cat: 'risk', avg: 6 },
          { cat: 'reward', avg: 7 },
          { cat: 'effort', avg: 4 }
        ],
        "robot": [
          { cat: 'risk', avg: 2 },
          { cat: 'reward', avg: 8 },
          { cat: 'effort', avg: 9 }
        ]
      }
    }
  };

  sessionStorage.setItem('data', JSON.stringify(testData));
  return testData;
}

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrl: './final-page.component.css',
  imports: [CommonModule]  // Add this line

})
export class FinalPageComponent {
  stats: any = {
    winners: [],
    details: {}
  };
  constructor(private router: Router, private http: HttpClient, private dialogRef: MatDialog) {}

  quitter() {
    this.router.navigate(['/']);
  }

  openDialog() {
    this.dialogRef.open(ContexteComponent);
  }

  // Modification du ngOnInit pour utiliser les données de test
  ngOnInit() {
    try {
      const data = sessionStorage.getItem('data');
      if (data) {
        const parsedData = JSON.parse(data);
        this.stats = parsedData.stats || this.stats;
      } else {
        // Aucune donnée trouvée, utiliser les données de test
        const testData = setupTestData();
        this.stats = testData.stats;
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      // En cas d'erreur, utiliser les données de test
      const testData = setupTestData();
      this.stats = testData.stats;
    }
  }

  loadStats() {
    try {
      const data = sessionStorage.getItem('data');
      if (data) {
        const parsedData = JSON.parse(data);
        this.stats = parsedData.stats || this.stats;
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  getPersons() {
    return Object.keys(this.stats.details || {});
  }

  getCategoryTitle(category: string): string {
    const titles: { [key: string]: string } = {
      'risk': 'Prise de risque',
      'reward': 'Récompense',
      'effort': 'Effort'
    };
    return titles[category] || category;
  }

  getEmoji(category: string): string {
    const emojis: { [key: string]: string } = {
      'risk': '🎯',
      'reward': '🏆',
      'effort': '💪'
    };
    return emojis[category] || '📊';
  }
}
