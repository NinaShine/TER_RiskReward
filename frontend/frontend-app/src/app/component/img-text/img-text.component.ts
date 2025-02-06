import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-img-text',
  templateUrl: './img-text.component.html',
  styleUrls: ['./img-text.component.css']
})

export class ImgTextComponent implements OnInit {
  content: string = '';
  imageUrl: string = '';

  constructor(private dataService: DataService) {}
  

  ngOnInit(): void {
    console.log("ImgTextComponent initialized");
    this.dataService.getRandomDoc().subscribe(data => {
      this.content = data.content;
      this.imageUrl = data.imageUrl; //il faut mettre les images dans assets
      console.log("Voici les données du back", data);
    });
  }

  

}
