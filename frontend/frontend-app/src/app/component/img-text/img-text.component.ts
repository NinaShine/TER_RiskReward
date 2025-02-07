import { Component, Input } from "@angular/core";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-img-text",
  templateUrl: "./img-text.component.html",
  styleUrls: ["./img-text.component.css"],
})
export class ImgTextComponent {
  @Input() content: string = "";
  @Input() imageUrl: string = "";

  constructor() {}

  ngOnInit(): void {
    console.log("✅ ImgTextComponent reçoit:", this.content, this.imageUrl);
  }
}
