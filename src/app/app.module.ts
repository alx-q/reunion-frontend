import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MessageComponent } from './message/message.component';
import { HeaderComponent } from './header/header.component';
import { AideComponent } from './aide/aide.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { Erreur404Component } from './erreur404/erreur404.component';
import { FooterComponent } from './footer/footer.component';
import { EnregistrementComponent } from './enregistrement/enregistrement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReunionComponent } from './reunion/reunion.component';
import { CreerEnregistrementComponent } from './creer-enregistrement/creer-enregistrement.component';
import { VoirEnregistrementComponent } from './voir-enregistrement/voir-enregistrement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'; 
import {MatTooltipModule} from '@angular/material/tooltip';
import { HttpClientModule } from  '@angular/common/http';
import { LectureMessageComponent } from './lecture-message/lecture-message.component';
import { CreerReunionComponent } from './creer-reunion/creer-reunion.component';

// Date
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import {MatSnackBarModule} from '@angular/material/snack-bar';
// Horloge
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { VoirReunionComponent } from './voir-reunion/voir-reunion.component';
import { HeaderReunionComponent } from './header-reunion/header-reunion.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    MessageComponent,
    HeaderComponent,
    AideComponent,
    ConnexionComponent,
    DocumentationComponent,
    Erreur404Component,
    FooterComponent,
    EnregistrementComponent,
    ReunionComponent,
    CreerEnregistrementComponent,
    VoirEnregistrementComponent,
    LectureMessageComponent,
    CreerReunionComponent,
    VoirReunionComponent,
    HeaderReunionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
