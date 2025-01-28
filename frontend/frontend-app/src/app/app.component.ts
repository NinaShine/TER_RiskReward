import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatSliderModule } from "@angular/material/slider";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, MatSliderModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  text: string = "";
  imageUrl: string = "";

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getTextAndImage().subscribe(
      (data) => {
        this.text = data.text;
        this.imageUrl = data.imageUrl;
      },
      (error) => {
        console.error("Erreur lors du chargement des données", error);
      }
    );
  }
}
