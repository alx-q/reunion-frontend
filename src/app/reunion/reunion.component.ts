import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { ReunionService } from '../services/reunion.service';
import { InfoReunion, Reunion, HeureReunion } from '../models/Reponses';
import { couleursRencontre, CouleursRencontre } from '../models/CouleursRencontre';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent {

  lesReunions: Reunion[] = [];
  laReunion!: InfoReunion;
  enChargement: boolean = false;

  nomComposante: string = "Reunion";
  activiteCourante: string = "accueil";
  reunionCourante:string = "ade3";

  estConnecte = false;

  couleursRencontres: CouleursRencontre[] = couleursRencontre;

  constructor(public serviceReunion: ReunionService){
    this.enChargement = true;
    this.estConnecte = serviceReunion.estConnecte;
    serviceReunion.obtenirReunions().subscribe(
      {
        next: (response) => {
          this.enChargement = false;
          this.lesReunions = response
        },
        error: (error) => {
          this.enChargement = false;
        }
      });
  }
  
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#fff',
      buttonColor: '#444'
    },
    dial: {
      dialBackgroundColor: '#444',
    },
    clockFace: {
      clockFaceBackgroundColor: '#eee',
      clockHandColor: '#444',
      clockFaceTimeInactiveColor: '#444'
    }
  };

  changerActivite(nomActivite: string) {
    this.activiteCourante = nomActivite;
  }

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

  voirReunion(id: number){
    this.activiteCourante = "voir";
    this.reunionCourante = "ade3";
  }
}
