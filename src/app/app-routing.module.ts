import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { CreerEnregistrementComponent } from './creer-enregistrement/creer-enregistrement.component';
import { CreerReunionComponent } from './creer-reunion/creer-reunion.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { EnregistrementComponent } from './enregistrement/enregistrement.component';
import { Erreur404Component } from './erreur404/erreur404.component';
import { LectureMessageComponent } from './lecture-message/lecture-message.component';
import { MessageComponent } from './message/message.component';
import { ReunionComponent } from './reunion/reunion.component';
import { VoirEnregistrementComponent } from './voir-enregistrement/voir-enregistrement.component';
import { VoirReunionComponent } from './voir-reunion/voir-reunion.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'message', component: MessageComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'enregistrement', component: EnregistrementComponent },
  { path: 'enregistrement/creer', component: CreerEnregistrementComponent },
  { path: 'invite/:id_invite', component: VoirEnregistrementComponent },
  { path: 'enregistrement/:id_reunion', component: EnregistrementComponent },
  { path: 'reunion', component: ReunionComponent },
  { path: 'reunion/creer', component: CreerReunionComponent },
  { path: 'reunion/:id_reunion', component: VoirReunionComponent },
  { path: 'mes-messages', component: LectureMessageComponent },
  { path: '**', component: Erreur404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
