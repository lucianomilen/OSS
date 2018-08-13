import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HeaderComponent} from './components/main/header/header.component';
import {MainComponent} from './components/main/main.component';
import {FooterComponent} from './components/main/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatAutocompleteModule, MatToolbarModule, MatInputModule} from '@angular/material';
import {SearchbarComponent} from './components/searchbar/searchbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import {IconsModule} from './icons.module';
import { HttpModule } from '@angular/http';


const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'about',   redirectTo: 'about', pathMatch: 'full' },
  { path: '', component: MainComponent},

  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    SearchbarComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    IconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
