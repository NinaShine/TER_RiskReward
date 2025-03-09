import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormsModule } from "@angular/forms"; // Import FormsModule

@Component({
  selector: "app-slider",
  imports: [FormsModule], // Add FormsModule to the imports array
  templateUrl: "./slider.component.html",
  styleUrl: "./slider.component.css",
})
export class SliderComponent implements OnChanges {
  @Input() value1: number = 5; // Déclaré comme @Input()
  @Input() value2: number = 5; // Valeur par défaut
  @Input() associationType!: string; // Ajout de l'input pour associationType
  @Input() singleSliderFlag = false;
  @Input() image: string = "";

  label1: string = "Mesure A"; // Label par défaut
  label2: string = "Mesure B"; // Label par défaut

  @Output() value1Change = new EventEmitter<number>(); //emitter for value1
  @Output() value2Change = new EventEmitter<number>(); //emitter for value2

  onValue1Change(newValue: number) {
    this.value1 = newValue;
    this.value1Change.emit(newValue); // Émet la nouvelle valeur du slider 1
  }

  onValue2Change(newValue: number) {
    this.value2 = newValue;
    this.value2Change.emit(newValue); // Émet la nouvelle valeur du slider 2
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes["image"]) {
      console.log("Image changée :", this.image);
      this.setLabels();
    }
  }

  ngOnInit() {
    this.setLabels();
  }
  setLabels() {
    const labelMapping: { [key: string]: { label1: string; label2: string } } =
      {
        "assets/perles.png": {
          label1: "Perles ramassées",
          label2: "Temps écoulé",
        },
        "assets/pont-croc.jpg": {
          label1: "Diamants collectés",
          label2: "Risque encouru",
        },
        "assets/pont-10000.png": {
          label1: "Travail effectué",
          label2: "Récompense gagnée",
        },
        "assets/pains.webp": {
          label1: "Rochers déplacés",
          label2: "Pains obtenus",
        },
        "assets/serrures.png": {
          label1: "Cadenas ouverts",
          label2: "Coffre obtenu",
        },
        "assets/coffre.png": {
          label1: "Marques creusées",
          label2: "Trésor découvert",
        },
        "assets/eboulement.png": {
          label1: "Rochers enlevés",
          label2: "Fatigue accumulée",
        },
        "assets/feu.webp": {
          label1: "Seaux d’eau portés",
          label2: "Seaux jetés",
        },
        "assets/vase.png": {
          label1: "Vases fabriqués",
          label2: "Vases transportés",
        },
      };

    if (this.image in labelMapping) {
      this.label1 = labelMapping[this.image].label1;
      this.label2 = labelMapping[this.image].label2;
    } else {
      this.label1 = "Valeur inconnue";
      this.label2 = "Valeur inconnue";
    }
  }
}
