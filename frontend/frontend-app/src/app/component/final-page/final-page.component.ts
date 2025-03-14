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
  loading: boolean = true;
  error: string | null = null;
  constructor(private router: Router, private http: HttpClient, private dialogRef: MatDialog) {}

  quitter() {
    this.router.navigate(['/']);
  }

  openDialog() {
    this.dialogRef.open(ContexteComponent);
  }

  ngOnInit() {
    this.loading = true;
    this.error = null;
    
    try {
      const data = JSON.parse(sessionStorage.getItem("stats")||"");

      if (!data) {
        this.error = 'No stats data found in session storage. Please complete the scenarios first.';
        console.error(this.error);
        // Redirect back to home page after 3 seconds if no data is found
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      } else {
        const parsedData = JSON.parse(data);
        if (!parsedData.stats) {
          this.error = 'Invalid stats data format';
          console.error(this.error);
        } else {
          this.stats = parsedData.stats;
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
