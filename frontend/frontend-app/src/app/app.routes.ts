import { Routes } from '@angular/router';
import { ImgTextComponent } from './component/img-text/img-text.component';
import { HomePageComponent } from './component/home-page/home-page.component';

export const routes: Routes = [
    { path: '', component : HomePageComponent},
    {path : 'img-text', component : ImgTextComponent},
];
