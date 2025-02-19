import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
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
    if (changes["associationType"]) {
      console.log("associationType changé :", this.associationType);
      this.setLabels();
    }
  }

  ngOnInit() {
    this.setLabels();
  }

  setLabels() {
    const labelMapping: { [key: string]: { label1: string; label2: string } } = {
      "effort-reward": { label1: "Effort", label2: "Récompense" },
      "risk-reward": { label1: "Risque", label2: "Récompense" },
      "risk-effort": { label1: "Risque", label2: "Effort" }
    };

    if (this.associationType in labelMapping) {
      this.label1 = labelMapping[this.associationType].label1;
      this.label2 = labelMapping[this.associationType].label2;
    }
  }
}
