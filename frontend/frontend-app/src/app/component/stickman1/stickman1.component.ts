import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stickman1',
  templateUrl: './stickman1.component.html',
  styleUrls: ['./stickman1.component.css']
})
export class Stickman1Component implements OnChanges {
  url1: string = '';
  name1: string = '';
  force1: string = '';
  item: any;
  @Input() individu: string='';

  constructor(private dataService: DataService) {}
  ngOnChanges(): void {
    this.item = sessionStorage.getItem("list_forces");

    if (this.item) {
      let itemsArray = JSON.parse(this.item); 

      console.log("S2 itemsArray", itemsArray);
      console.log("S1 individu A:", this.individu)
      let selectedItem = itemsArray.find((obj: { desc: string; }) => obj.desc === this.individu);

      if (selectedItem){
        this.url1 = selectedItem.image;
        this.name1 = selectedItem.desc;
        this.force1 = selectedItem.value;
        console.log("Image individu chargée:", this.url1);
      }else{
        console.log("S1 Aucun objet trouvé avec la description:", this.individu);
      }
    } else {
      console.log("S1 erreur, var de session incorrecte");
    }
    }
  }
