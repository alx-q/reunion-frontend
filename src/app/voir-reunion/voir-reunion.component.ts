import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { ReunionService } from '../services/reunion.service';
import { InfoReunion, Reunion, HeureReunion, Acceptation, ParticipantsReunion, Invitation } from '../models/Reponses';
import { couleursRencontre, CouleursRencontre } from '../models/CouleursRencontre';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-voir-reunion',
  templateUrl: './voir-reunion.component.html',
  styleUrls: ['./voir-reunion.component.css']
})
export class VoirReunionComponent {
  nomComposante: string = "Reunion";

  // Id reunion
  id: number = 0;

  // Infos Temporaires sur la reunion et ses participants
  laReunion!: InfoReunion;
  participations!: ParticipantsReunion;

  // Invitations
  lesInvitations!: Invitation[];

  // Ecran Chargement
  enChargement: boolean = false;
  enChargementOverlay: boolean = false;

  // Couleurs
  couleursRencontres: CouleursRencontre[] = couleursRencontre;

  constructor(public serviceReunion: ReunionService, private route: ActivatedRoute, public snackBar: MatSnackBar) {
    this.route.params.subscribe(params => {
      this.id = params['id_reunion'];
      this.initialiserInfos();
    });
  }

  initialiserInfos() {
    this.enChargement = true;
    this.serviceReunion.obtenirInfoReunion(this.id).subscribe(
      {
        next: (response) => {
          this.enChargement = false;
          this.laReunion = response
        },
        error: (error) => {
          this.enChargement = false;
        }
      });
  }

  // Theme de l'horloge
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

  /*
    Ecran courant de la page  
  */

  activiteCourante: string = "voir";

  changerActivite(nomActivite: string) {
    if (nomActivite == "voirParticipants") {
      this.enChargementOverlay = true;
      this.serviceReunion.obtenirParticipants(this.id).subscribe(
        {
          next: (response) => {
            this.enChargementOverlay = false;
            this.participations = response;
            this.activiteCourante = nomActivite;
          },
          error: (error) => {
            this.enChargementOverlay = false;
          }
        });
    } else if (nomActivite == "parametres") {
      this.changerOngletParametres("details");
      this.activiteCourante = nomActivite;
    } else if (nomActivite == "invitations") {
      this.enChargementOverlay = true;
      this.serviceReunion.obtenirInvites(this.id).subscribe(
        {
          next: (response) => {
            this.enChargementOverlay = false;
            this.lesInvitations = response;
            this.activiteCourante = nomActivite;
          },
          error: (error) => {
            this.enChargementOverlay = false;
          }
        });
    } else {
      this.activiteCourante = nomActivite;
    }
  }


  /*
    Formattage Heures
  */

  formatterDate(envoi: string) {
    let envoiP = new Date(envoi);
    return envoiP.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  ajouterZeros(chiffre: number) {
    if (chiffre >= 0 && chiffre <= 9) {
      return "0" + chiffre;
    } else {
      return chiffre;
    }
  }

  enleverSecondes(heure: string) {
    return heure.substring(0, heure.length - 3);
  }

  /* 
    Confirmation Heures
  */

  confirmerHeure(id_heure: number) {
    this.enChargementOverlay = true;
    this.serviceReunion.confirmerHeure(id_heure).subscribe(
      {
        next: (response) => {
          let heure = this.laReunion.acceptations.find(acc => acc.id_heure == id_heure);
          if (heure == null) {
            let acceptation: Acceptation = { id: 1234, id_heure: id_heure, accepte: true, id_user: this.serviceReunion.nomUtilisateur }
            this.laReunion.acceptations.push(acceptation);
          } else {
            heure.accepte = !heure.accepte;
          }
          this.enChargementOverlay = false;
        },
        error: (error) => {
          this.enChargementOverlay = false;
        }
      });
  }

  ajouteDisponibiliteFantome(id_heure: number) {
    let acceptation: Acceptation = { id: new Date().getTime(), id_heure: id_heure, accepte: false, id_user: this.serviceReunion.nomUtilisateur }
    this.laReunion.acceptations.push(acceptation);
  }

  verifierDisponibilite(id_heure: number) {
    let acceptation = this.laReunion.acceptations.find(acc => acc.id_heure == id_heure)
    return acceptation;
  }

  verifierDisponibiliteEtranger(username: string, id_heure: number) {
    let acceptation = this.participations.acceptations.find(acc => acc.id_heure == id_heure && acc.id_user == username);
    if (acceptation == null) {
      return false;
    }
    return acceptation.accepte;
  }


  /**
   * Invites
   */

  inviteCourant: number = 0;

  copierInvitation(contenu: string) {
    navigator.clipboard.writeText(window.location.origin + "/invite/" + contenu);
    this.snackBar.open("Lien copié dans le presse-papier", "", {
      duration: 3000,
    });
  }

  supprimerInvitation(id_lien: string) {
    this.enChargementOverlay = true;
    this.serviceReunion.supprimerInvite(this.id, id_lien).subscribe(
      {
        next: (response) => {
          this.enChargementOverlay = false;
          this.snackBar.open("Invitation supprimée", "", {
            duration: 3000,
          });
          this.changerActivite("invitations");
        },
        error: (error) => {
          this.enChargementOverlay = false;
        }
      });
  }

  changerOngletInvites(i: number) {
    this.inviteCourant = i;
  }

  creerInvitation() {
    this.enChargementOverlay = true;
    this.serviceReunion.creerInvite(
      this.id,
      this.formulaireInvitation.get('date')!.value,
      this.formulaireInvitation.get('nom')!.value
    ).subscribe(
      {
        next: (response) => {
          this.enChargementOverlay = false;
          this.snackBar.open("Invitation ajoutée", "", {
            duration: 3000,
          });
          this.changerActivite("invitations");
        },
        error: (error) => {
          this.enChargementOverlay = false;
        }
      });
  }

  formulaireInvitation: FormGroup = new FormGroup(
    {
      nom: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+([ '-][a-zA-Z ])?[a-zA-Z ]*$")]),
      date: new FormControl('', [Validators.required])
    }
  );


  getClasseValidite(entree: string): string {
    let input = this.formulaireInvitation.get(entree);
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





  /**
   * Parametres
   */

  heuresParametres: HeureReunion[] = [];
  indexHeure = 0;


  parametreCourant: string = "details";

  changerOngletParametres(param: string) {
    if (param == 'participants') {
      this.enChargementOverlay = true;
      this.serviceReunion.obtenirParticipants(this.id).subscribe(
        {
          next: (response) => {
            this.enChargementOverlay = false;
            this.participations = response;
            this.parametreCourant = param;
          },
          error: (error) => {
            this.enChargementOverlay = false;
          }
        });
    } else if (param == 'heures') {
      this.initialiserHeures();
      this.parametreCourant = param;
    } else {
      this.parametreCourant = param;
    }
  }


  formatterHeure(heureCanadienne: string) {
    heureCanadienne = "2000-01-01 " + heureCanadienne
    return new Date(heureCanadienne).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  initialiserHeures() {
    this.heuresParametres = [];
    for (let i = 0; i < this.laReunion.heures.length; i++) {
      this.heuresParametres.push({
        id: this.laReunion.heures[i].id,
        date: this.laReunion.heures[i].date,
        heure: this.formatterHeure(this.laReunion.heures[i].heure),
        duree: this.laReunion.heures[i].duree
      });
    }
  }

  ajouterHeure() {
    this.heuresParametres.push({
      id: new Date().getTime(),
      date: "2023-10-12",
      heure: "2:00 PM",
      duree: 2
    });
  }

  supprimerHeure(i: number) {
    this.heuresParametres.splice(i, 1);
    if (this.heuresParametres.length == 0) {
      this.ajouterHeure();
    }
  }

  convertirHeures() {

  }

  changementHoraire() {
    this.enChargementOverlay = true;
    this.serviceReunion.modifierHeures(this.id, this.heuresParametres).subscribe({
      next: (response) => {
        this.enChargementOverlay = false;
        this.initialiserInfos();
        this.changerActivite("voir");
      },
      error: (error) => {
        this.enChargementOverlay = false;
      }
    });
  }

  changementDetails() {
    this.enChargementOverlay = true;
    this.serviceReunion.changerDetails(this.laReunion.infos[0]).subscribe({
      next: (response) => {
        this.enChargementOverlay = false;
        this.initialiserInfos();
        this.changerActivite("voir");
      },
      error: (error) => {
        this.enChargementOverlay = false;
      }
    });
  }

  enleverOuAjouterAdmin(username: string, est_admin: boolean) {
    this.enChargementOverlay = true;
    this.serviceReunion.ajouterOuEnleverAdmin(username, this.id, est_admin).subscribe({
      next: (response) => {
        this.enChargementOverlay = false;
        this.snackBar.open("Paramètres d'administration changés", "", {
          duration: 3000,
        });
        this.changerOngletParametres('participants');
      },
      error: (error) => {
        let erreur = error.error.message;
        this.snackBar.open(erreur, "", {
          duration: 3000,
        });
        this.enChargementOverlay = false;
      }
    });
  }

  supprimerUtilisateur(username: string) {
    let est_meme = username == this.serviceReunion.nomUtilisateur

    this.enChargementOverlay = true;
    this.serviceReunion.supprimerMembre(this.id, username).subscribe({
      next: (response) => {
        this.enChargementOverlay = false;
        this.snackBar.open("Utilisateur Supprimé", "", {
          duration: 3000,
        });
        if(est_meme){
          window.location.href = "/reunion"
        } else {
          this.changerOngletParametres('participants');
        }
      },
      error: (error) => {
        let erreur = error.error.message;
        this.snackBar.open(erreur, "", {
          duration: 3000,
        });
        this.enChargementOverlay = false;
      }
    });
  }

  supprimerReunion(){
    this.enChargementOverlay = true;
    this.serviceReunion.supprimerReunion(this.id).subscribe({
      next: (response) => {
        this.enChargementOverlay = false;
        window.location.href = "/reunion"
      },
      error: (error) => {
        let erreur = error.error.message;
        this.snackBar.open(erreur, "", {
          duration: 3000,
        });
        this.enChargementOverlay = false;
      }
    });
  }

}


