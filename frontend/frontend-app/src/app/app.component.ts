import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css", 
})
export class AppComponent implements OnInit {
  //sliderValue1: number = 5; // Stocke la valeur du slider 1!!
  //sliderValue2: number = 5; // Stocke la valeur du slider 2
  content: string = "Ceci est un texte"; // Stocke le contenu de l'image et du texte
  imageUrl: string = "https://picsum.photos/200"; // Stocke l'url de l'image
  associationType: string = "effort-reward"; // Stocke le type d'association

  ngOnInit(): void {
    console.log("AppComponent initialized");
  }
}
