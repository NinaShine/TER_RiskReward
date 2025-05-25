import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-slider",
  imports: [FormsModule], 
  templateUrl: "./slider.component.html",
  styleUrl: "./slider.component.css",
})
export class SliderComponent implements OnChanges {
  @Input() value1: number = 5; // Déclaré comme @Input()
  @Input() value2: number = 5; // Valeur par défaut
  @Input() associationType!: string; 
  @Input() singleSliderFlag = false;
  @Input() image: string = "";

  label1: string = "Mesure A"; // Label par défaut
  label2: string = "Mesure B"; // Label par défaut

  @Output() value1Change = new EventEmitter<number>(); //emitter for value1
  @Output() value2Change = new EventEmitter<number>(); //emitter for value2

  onValue1Change(newValue: number) {
    this.value1 = newValue;
    this.value1Change.emit(newValue); 
  }

  onValue2Change(newValue: number) {
    this.value2 = newValue;
    this.value2Change.emit(newValue); 
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
          label1: "Perles à ramasser",
          label2: "Perles à distribuer",
        },
        "assets/pont-croc.jpg": {
          label1: "Diamants à collecter",
          label2: "Diamants à distribuer",
        },
        "assets/pont-10000.png": {
          label1: "Heures de travail",
          label2: "Milliers d'euros à distribuer",
        },
        "assets/pains.webp": {
          label1: "Rochers à déplacer",
          label2: "Pains obtenus à distribuer",
        },
        "assets/serrures.png": {
          label1: "Numéro du cadenas à ouvrir",
          label2: "Pièces d'or à distribuer",
        },
        "assets/coffre.png": {
          label1: "Marques à creuser",
          label2: "Trésors découverts à distribuer",
        },
        "assets/eboulement.png": {
          label1: "Rochers instables à déplacer",
          label2: "Rochers lourds à déplacer",
        },
        "assets/feu.webp": {
          label1: "Seaux d’eau à porter",
          label2: "Seaux d'eau à jeter",
        },
        "assets/vase.png": {
          label1: "Vases à fabriquer",
          label2: "Vases à transporter",
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
