import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { EInfoReunion, EHeureReunion } from '../models/Reponses';
import { ReunionService } from '../services/reunion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-reunion',
  templateUrl: './creer-reunion.component.html',
  styleUrls: ['./creer-reunion.component.css']
})
export class CreerReunionComponent {
  nomComposante: string = "Creer Reunion";

  dateReunion = '';
  heureReunion = '';
  dureeReunion = '';
  visibilite = 'publique';
  enChargement:boolean = false;
  estConnecte:boolean = true;

  etape = 1;

  constructor(private serviceReunion: ReunionService, private router: Router) {
    this.estConnecte = serviceReunion.estConnecte;
  }

  changerEtape(nouvelleEtape: number) {
    if (nouvelleEtape >= 1 && nouvelleEtape <= 3) {
      this.etape = nouvelleEtape;
    } else if (nouvelleEtape == 4) {
      this.envoyerInfos();
    }
  }

  formulaireNouveau: FormGroup = new FormGroup(
    {
      titre: new FormControl('', [Validators.required, Validators.pattern("^(?![-' ])[A-Za-z-' ]*$")]),
      lieu: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      couleur: new FormControl('', [Validators.required]),
      dateLimite: new FormControl('', [Validators.required]),
      mdp: new FormControl('', []),
      mdpc: new FormControl('', [])
    },
    {
      validators: this.ValidateurIdentique
    }
  );

  ValidateurIdentique(control: AbstractControl): any {
    const mdp: string = control.get("mdp")!.value;
    const mdpc: string = control.get("mdpc")!.value;
    if (mdp !== mdpc) {
      control.get("mdpc")!.setErrors({ mismatch: true });
    }
  }

  configDates: boolean = false;

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

  valider(entree: string): boolean {
    let input = this.formulaireNouveau.get(entree);
    if (input != null) {
      return input?.invalid && input?.touched
    } else {
      return false;
    }
  }

  getClasseValidite(entree: string): string {
    let input = this.formulaireNouveau.get(entree);
    if (input != null) {
      if (input?.touched) {
        if (input?.valid) {
          return "is-valid";
        } else {
          return "is-invalid";
        }
      } else {
        return "";
      }
    } else {
      return "";
    }
  }


  horaires: Horaires[] = [
    {
      date: new Date(),
      heure: "2:00 PM",
      duree: 2
    }
  ];

  ajouterHoraire() {
    this.horaires.push({
      date: new Date(),
      heure: "2:00 PM",
      duree: 2
    })
  }

  changementHoraire(type: number, nouvelleValeur: any, index: number) {
    if (type == 0) {
      this.horaires[index].date = new Date(nouvelleValeur);
    } else if (type == 1) {
      this.horaires[index].heure = nouvelleValeur;
    } else if (type == 2) {
      this.horaires[index].duree = nouvelleValeur;
    }
  }

  formatterDate(envoi: string): string {
    let envoiP = new Date(envoi);
    return envoiP.getFullYear() + "-" + this.ajouterZeros(envoiP.getMonth() + 1) + "-" + this.ajouterZeros(envoiP.getDate());
  }

  ajouterZeros(chiffre: number) {
    if (chiffre >= 0 && chiffre <= 9) {
      return "0" + chiffre;
    } else {
      return chiffre;
    }
  }

  formatterHeure(heureAmericaine: string) {
    let heuresAditionelle = 0;
    let pm = false;
    if (heureAmericaine.substring(heureAmericaine.length - 2, heureAmericaine.length) == "AM") {
      heuresAditionelle = 0;
      pm = false;

    } else if (heureAmericaine.substring(heureAmericaine.length - 2, heureAmericaine.length) == "PM") {
      heuresAditionelle = 12;
      pm = true;
    } else {
      return "12:00:00";
    }

    let indexLtr = 0;
    while (heureAmericaine.charAt(indexLtr) != ":") {
      indexLtr++;
    }

    let heure = parseInt(heureAmericaine.substring(0, indexLtr));
    let minutes = heureAmericaine.substring(indexLtr + 1, indexLtr + 3);

    if(pm == false && heure == 12){
      heure = 0;
    } else if (pm == true && heure == 12){
      heure = 12
    } else {
      heure += heuresAditionelle;
    }

    return heure + ":" + minutes + ":00";
  }

  supprimerHeure(i: number) {
    this.horaires.splice(i, 1);
    if (this.horaires.length == 0) {
      this.ajouterHoraire();
    }
  }

  envoyerInfos() {

    let heures: EHeureReunion[] = [];
    for (let i = 0; i < this.horaires.length; i++) {
      heures.push({
        date: this.formatterDate(this.horaires[i].date.toDateString()),
        heure: this.formatterHeure(this.horaires[i].heure),
        duree: this.horaires[i].duree + ""
      })
    }

    let infos: EInfoReunion = {
      info: {
        titre: this.formulaireNouveau.get("titre")!.value,
        nom: this.serviceReunion.nomUtilisateur,
        description: this.formulaireNouveau.get("description")!.value,
        lieu: this.formulaireNouveau.get("lieu")!.value,
        couleur: parseInt(this.formulaireNouveau.get("couleur")!.value),
        date_limite: this.formatterDate(this.formulaireNouveau.get("dateLimite")!.value),
        mdp: this.formulaireNouveau.get("mdp")!.value,
        utilisateur: this.serviceReunion.nomUtilisateur
      },
      heures: heures
    }

    this.enChargement = true;
    this.serviceReunion.creerReunion(infos).subscribe({
      next: (response) => {
        this.enChargement = false;
        this.router.navigate(['/reunion']);
      },
      error: (error) => {
        this.enChargement = false;
      }
    });
  }
}

interface Horaires {
  date: Date,
  heure: string,
  duree: number
}
