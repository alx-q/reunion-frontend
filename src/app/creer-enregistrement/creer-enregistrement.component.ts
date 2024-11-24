import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-creer-enregistrement',
  templateUrl: './creer-enregistrement.component.html',
  styleUrls: ['./creer-enregistrement.component.css']
})
export class CreerEnregistrementComponent {
  nomComposante:string = "Creer Enregistrement";

  formulaireNouveau: FormGroup = new FormGroup(
    {
      nom: new FormControl('', [Validators.required, Validators.pattern("^(?![-' ])[A-Za-z-' ]*$")]),
      prenom: new FormControl('', [Validators.required, Validators.pattern("^(?![-' ])[A-Za-z-' ]*$")]),
      courriel: new FormControl('', [Validators.required, Validators.email]),
      mdp: new FormControl('', [Validators.required, Validators.minLength(8)]),
      mdpc: new FormControl('', [Validators.required, Validators.minLength(8)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      identifiant: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^(?=.*[A-Z0-9]).+$")])
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

  envoyerNouveau(){
    console.log("Nom: " + this.formulaireNouveau.get("nom")!.value);
    console.log("Prenom: " + this.formulaireNouveau.get("prenom")!.value);
    console.log("Courriel: " + this.formulaireNouveau.get("courriel")!.value);
    console.log("Mot de passe: " + this.formulaireNouveau.get("mdp")!.value);
    console.log("Confirmation Mot de passe: " + this.formulaireNouveau.get("mdpc")!.value);
    console.log("Description: " + this.formulaireNouveau.get("description")!.value);
    console.log("Identifiant: " + this.formulaireNouveau.get("identifiant")!.value);
  }

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
}
