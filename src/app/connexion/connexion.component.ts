import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  erreur:string = "";
  constructor(private serviceConnexion: ConnexionService) { }

  estConnecte: boolean = this.serviceConnexion.estConnecte;

  enChargement: boolean = false;

  formulaireConnexion: FormGroup = new FormGroup(
    {
      utilisateur: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]*$")]),
      mdp: new FormControl('', [Validators.required, Validators.minLength(8)])
    }
  );

  envoyerConnexion(){
    if(this.formulaireConnexion.valid){

    }
    this.enChargement = true;
    this.erreur = "";
    let messageEnvoye = this.serviceConnexion.connecter(
      this.formulaireConnexion.get("utilisateur")!.value,
      this.formulaireConnexion.get("mdp")!.value
    ).subscribe(
      {
        next: (response) => {
          this.enChargement = false;
          this.estConnecte = true;
          this.serviceConnexion.verifierToken(response.data);
        },
        error: (error) => {
          this.enChargement = false;
          this.erreur = error.error.message;
        }
      }
    );
  }

  valider(entree: string): boolean {
    let input = this.formulaireConnexion.get(entree);
    if (input != null) {
      return input?.invalid && input?.touched
    } else {
      return false;
    }
  }

  getClasseValidite(entree: string): string {
    let input = this.formulaireConnexion.get(entree);
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
