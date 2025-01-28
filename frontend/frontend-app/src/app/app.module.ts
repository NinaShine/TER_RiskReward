import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";

import { AppComponent } from "./app.component";
import { DataComponent } from "./data/data.component";

import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [AppComponent, DataComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
