import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ContexteComponent } from '../contexte/contexte.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrl: './final-page.component.css',
  imports: [CommonModule]  // Add this line

})
export class FinalPageComponent {
  stats: any = {
    winners: {
      risk: {avg: 0, perso: ''},
      reward: {avg: 0, perso: ''},
      effort: {avg: 0, perso: ''}
    }
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
        this.stats = parsedData.stats;
      } else {
        console.error('No stats data found in session storage');
      }
    } catch (error) {
      console.error('Error loading stats:', error);
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
    return Object.keys(this.stats).filter(key => key !== 'winners');
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
