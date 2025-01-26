import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatSliderModule } from "@angular/material/slider";
@Component({
  selector: "app-root",
  imports: [RouterOutlet, MatSliderModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "frontend-app";
}
