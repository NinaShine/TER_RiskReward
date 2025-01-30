import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms"; // Import FormsModule

@Component({
  selector: "app-slider",
  imports: [FormsModule], // Add FormsModule to the imports array
  templateUrl: "./slider.component.html",
  styleUrl: "./slider.component.css",
})
export class SliderComponent {
  @Input() value1: number = 5; // ✅ Déclaré comme @Input()
  @Input() value2: number = 5; // Valeur par défaut

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
}
