import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppComponent } from "./app.component";
import { SliderComponent } from "./component/slider/slider.component";
import { FormsModule } from "@angular/forms";
import { ImgTextComponent } from "./component/img-text/img-text.component";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { Stickman1Component } from "./component/stickman1/stickman1.component";
import { Stickman2Component } from "./component/stickman2/stickman2.component";
import { SubmitComponent } from "./component/submit/submit.component";
import { ForcesPageComponent } from "./component/forces-page/forces-page.component";

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    ImgTextComponent,
    Stickman1Component,
    Stickman2Component,
    SubmitComponent,
    ForcesPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    CommonModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
