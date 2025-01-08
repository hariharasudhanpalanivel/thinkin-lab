import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ProjectsComponent } from './pages/projects/projects.component';

export const routes: Routes = [
    {path:"home", component:HomeComponent},
    {path:"projects", component:ProjectsComponent},
    {path:"careers", component:CareersComponent},
    {path:"about", component:AboutComponent},
    {path:"contact", component:ContactUsComponent},
    {path:"", pathMatch:"full", redirectTo:"home"},
    {path:"**", pathMatch:"full", redirectTo:"home"}
];
