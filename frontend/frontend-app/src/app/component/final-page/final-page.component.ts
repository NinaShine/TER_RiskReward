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
  imports: [CommonModule]  

})
export class FinalPageComponent {
  stats: any = {
    winners: {
      risk: {avg: 0, perso: ''},
      reward: {avg: 0, perso: ''},
      effort: {avg: 0, perso: ''}
    }
  };
  loading: boolean = true;
  error: string | null = null;
  constructor(private router: Router, private http: HttpClient, private dialogRef: MatDialog) {}

  quitter() {
    this.http.post("http://localhost:3000/reset-session", {}, { withCredentials: true }).subscribe({
      next: () => {
        console.log("Session réinitialisée");
        sessionStorage.clear(); 
        this.router.navigate(['/']); 
      },
      error: (error) => {
        console.error("Erreur lors de la réinitialisation :", error);
        this.router.navigate(['/']); 
      }
    });
  }

  openDialog() {
    this.dialogRef.open(ContexteComponent);
  }

  ngOnInit() {
    this.loading = true;
    this.error = null;
    
    try {
      const data = sessionStorage.getItem("stats")||"";

      if (!data) {
        this.error = 'No stats data found in session storage. Please complete the scenarios first.';
        console.error(this.error);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      } else {
        const parsedData = JSON.parse(data);
        console.log('Parsed data:',parsedData);
        if (!parsedData) {
          this.error = 'Invalid stats data format';
          console.error(this.error);
        } else {
          this.stats = parsedData;
        } 
      }
    } catch (error) {
      this.error = 'Error loading stats: ' + (error instanceof Error ? error.message : 'Unknown error');
      console.error('Error loading stats:', error);
    } finally {
      this.loading = false;
    }
  }

  loadStats() {
    try {
      const data = sessionStorage.getItem('data');
      if (data) {
        const parsedData = JSON.parse(data);
        console.log('Parsed data:', parsedData);
        this.stats = parsedData.stats || this.stats;
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  getPersons() {
    return Object.keys(this.stats).filter(key => key !== 'winners');
  }

  getDetailsPersons(): string[] {
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
