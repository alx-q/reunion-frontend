import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReunionService } from '../services/reunion.service';

@Component({
  selector: 'app-enregistrement',
  templateUrl: './enregistrement.component.html',
  styleUrls: ['./enregistrement.component.css']
})
export class EnregistrementComponent {
  activiteCourante: string = "accueil";
  nomComposante: string = "Enregistrement";

  enChargement: boolean = false;
  erreur: string = "";
  erreurIsc: string = "";

  idInvitation = "122112212121";

  constructor(private serviceReunion: ReunionService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if(params['id_reunion'] != null){
        this.idInvitation = params['id_reunion'];
      } else {
        this.idInvitation = "";
      }
    });
    if(this.serviceReunion.estConnecte){
      document.location.href = "/reunion";
    }
  }

  annulerInvitation() {
    this.idInvitation = "";
  }

  formulaireConnexion: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]*$")]),
      mdp: new FormControl('', [Validators.required])
    }
  );

  formulaireInscription: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]*$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      nom: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+([ '-][a-zA-Z ])?[a-zA-Z ]*$")]),
      mdp: new FormControl('', [Validators.required, Validators.minLength(8)]),
      mdpc: new FormControl('', [Validators.required, Validators.minLength(8)])
    },
    {
      validators: this.ValidateurIdentique
    }
  );

  connecter(){
    this.connexion(this.formulaireConnexion.get('username')!.value, this.formulaireConnexion.get('mdp')!.value);
  }

  connexion(username: string, mdp:string) {
    this.enChargement = true;
    this.serviceReunion.seConnecter(username, mdp).subscribe(
      {
        next: (response) => {
          this.enChargement = false;
          localStorage.setItem("token_reunion", String(response));

          if(this.idInvitation != ""){
            document.location.href = "/invite/" + this.idInvitation;
          } else {
            document.location.href = "/reunion";
          }
        },
        error: (error) => {
          this.enChargement = false;
          this.erreur = error.error.message;
        }
      });
  }

  inscrire() {
    this.enChargement = true;
    this.serviceReunion.creerUtilisateur(
      this.formulaireInscription.get('username')!.value,
      this.formulaireInscription.get('email')!.value,
      this.formulaireInscription.get('nom')!.value,
      this.formulaireInscription.get('mdp')!.value,
    ).subscribe(
      {
        next: (response) => {
          this.connexion(this.formulaireInscription.get('username')!.value, this.formulaireInscription.get('mdp')!.value);
          this.enChargement = false;
        },
        error: (error) => {
          this.enChargement = false;
          this.erreurIsc = error.error.message;
        }
      });
  }

  ValidateurIdentique(control: AbstractControl): any {
    const mdp: string = control.get("mdp")!.value;
    const mdpc: string = control.get("mdpc")!.value;
    if (mdp !== mdpc) {
      control.get("mdpc")!.setErrors({ mismatch: true });
    }
  }

  valider(entree: string): boolean {
    let input = this.formulaireConnexion.get(entree);
    if (input != null) {
      return input?.invalid && input?.touched
    } else {
      return false;
    }
  }

  getClasseValidite(entree: string, formulaire: FormGroup): string {
    let input = formulaire.get(entree);
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
}
