import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SliderComponent } from "../slider/slider.component";
import { RouterLink } from "@angular/router";
import{MatSliderModule} from '@angular/material/slider';
import { FormsModule } from "@angular/forms";

interface Force {
  image: string;
  desc: string;
  value: number;
}

@Component({
  selector: "app-forces-page",
  imports: [SliderComponent, CommonModule, RouterLink, MatSliderModule, FormsModule],
  templateUrl: "./forces-page.component.html",
  styleUrls: ["./forces-page.component.css"],
})
export class ForcesPageComponent {
  forces: Force[] = [
    { image: "assets/vieux.png", desc: "Vieux pas genré", value: 1 },
    { image: "assets/garçons.png", desc: "Enfant pas genré", value: 1 },
    { image: "assets/robot.png", desc: "Robot", value: 1 },
    { image: "assets/homme_petit.png", desc: "Homme petite taille", value: 1 },
    { image: "assets/femme_petite.png", desc: "Femme petite taille", value: 1 },
    { image: "assets/homme_grand.png", desc: "Homme grande taille", value: 1 },
    { image: "assets/femme_grande.png", desc: "Femme grande taille", value: 1 },
  ];

  submit() {
    sessionStorage.setItem("list_forces", JSON.stringify(this.forces));
    const forces = JSON.parse(sessionStorage.getItem("list_forces") || "[]");
    console.table(forces);
  }
}