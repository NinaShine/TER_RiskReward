import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stickman1',
  templateUrl: './stickman1.component.html',
  styleUrls: ['./stickman1.component.css']
})
export class Stickman1Component implements OnInit {
  url1: string = '';
  name1: string = '';
  force1: string = '';
  item: any;
  //@Input() scenario: any;
  @Input() individuA: string='';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.item = sessionStorage.getItem("list_forces");
    //console.log("item de session:", this.item);

    if (this.item != null) {
      let itemsArray = JSON.parse(this.item); // Conversion en tableau d'objets

      let selectedItem = itemsArray.find((obj: { desc: string; }) => obj.desc === this.individuA);

      if (selectedItem){
        this.url1 = selectedItem.image;
        this.name1 = selectedItem.desc;
        this.force1 = selectedItem.value;
        console.log("S1 url1:", this.url1);
      }else{
        console.log("Aucun objet trouvé avec la description:", this.individuA);
      }
    } else {
      console.log("erreur, var de session incorrecte");
    }

    /*console.log(this.individuA);
    console.log(this.url1,"donne moi l'url")
    switch (this.individuA) {
      case 'homme grande taille':
        this.url1 = '../assets/hommegt.png';
        break;
      case 'femme grande taille':
        this.url1 = '../assets/femmegt.png';
        break;
      case 'enfant pas genré':
        this.url1 = '../assets/garçons.png';
        break;
      case 'vieux pas genré':
        this.url1 = '../assets/vieux.png';
        break;
      case 'homme petite taille':
        this.url1 = '../assets/homme_petit.png';
        break;
      case 'femme petite taille':
        this.url1 = '../assets/femme_petite.png';
        break;
      case 'robot':
        this.url1 = '../assets/robot.png';
        break;*/
    }
    //console.log('Stickman1Component reçoit les data:', this.scenario);

  ngOnChanges(): void {
    this.item = sessionStorage.getItem("list_forces");
    //console.log("item de session:", this.item);

    if (this.item) {
      let itemsArray = JSON.parse(this.item); // Conversion en tableau d'objets

      console.log("S2 itemsArray", itemsArray);
      console.log("S1 individu A:", this.individuA)
      let selectedItem = itemsArray.find((obj: { desc: string; }) => obj.desc === this.individuA);

      if (selectedItem){
        this.url1 = selectedItem.image;
        this.name1 = selectedItem.desc;
        this.force1 = selectedItem.value;
      }else{
        console.log("S1 Aucun objet trouvé avec la description:", this.individuA);
      }
    } else {
      console.log("S1 erreur, var de session incorrecte");
    }

    /*console.log(this.individuA);
    console.log(this.url1,"donne moi l'url:changes")
    switch (this.individuA) {
      case 'homme grande taille':
        this.url1 = '../assets/hommegt.png';
        break;
      case 'femme grande taille':
        this.url1 = '../assets/femmegt.png';
        break;
      case 'enfant pas genré':
        this.url1 = '../assets/garçons.png';
        break;
      case 'vieux pas genré':
        this.url1 = '../assets/vieux.png';
        break;
      case 'homme petite taille':
        this.url1 = '../assets/homme_petit.png';
        break;
      case 'femme petite taille':
        this.url1 = '../assets/femme_petite.png';
        break;
      case 'robot':
        this.url1 = '../assets/robot.png';
        break;*/
    }
    //console.log('Stickman1Component reçoit les data:', this.scenario);
  }
