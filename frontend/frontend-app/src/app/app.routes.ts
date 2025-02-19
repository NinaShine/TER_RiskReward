import { Routes } from '@angular/router';
import { ImgTextComponent } from './component/img-text/img-text.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ForcesPageComponent } from './component/forces-page/forces-page.component';

export const routes: Routes = [
    { path: '', component : HomePageComponent},
    {path : 'img-text', component : ImgTextComponent},
    {path : 'forces', component : ForcesPageComponent},

];
