import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'apropos', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];