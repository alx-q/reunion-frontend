import { Component, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [ConnexionService]
})
export class MessageComponent {
  nomComposante: string = "Message";
  messageEnvoye: boolean = false;

  constructor(private serviceConnexion: ConnexionService) { }

  formulaireMessage: FormGroup = new FormGroup(
    {
      nom: new FormControl('', [Validators.required, Validators.pattern("^(?![-' ])[A-Za-z-' ]*$")]),
      prenom: new FormControl('', [Validators.required, Validators.pattern("^(?![-' ])[A-Za-z-,' ]*$")]),
      courriel: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required, Validators.maxLength(250)])
    }
  );

  envoyerMessage() {
    let messageEnvoye = this.serviceConnexion.transmettreMessage(
      this.formulaireMessage.get("nom")!.value,
      this.formulaireMessage.get("prenom")!.value,
      this.formulaireMessage.get("courriel")!.value,
      this.formulaireMessage.get("message")!.value
    ).subscribe(
      {
        next: (response) => {
          this.messageEnvoye = true;
        },
        error: (error) => {
        }
      }
    );
  }

  valider(entree: string): boolean {
    let input = this.formulaireMessage.get(entree);
    if (input != null) {
      return input?.invalid && input?.touched
    } else {
      return false;
    }
  }

  verifierValidite(entree: string): boolean {
    let input = this.formulaireMessage.get(entree);
    if (input != null) {
      return input?.valid && input?.touched
    } else {
      return false;
    }
  }

  getClasseValidite(entree: string): string {
    let input = this.formulaireMessage.get(entree);
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
