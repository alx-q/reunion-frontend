import { Component } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { TousMessages, Message } from '../models/Reponses';

@Component({
  selector: 'app-lecture-message',
  templateUrl: './lecture-message.component.html',
  styleUrls: ['./lecture-message.component.css']
})
export class LectureMessageComponent {
  nomComposante: string = "Lecture Messages";
  lesMessages!: TousMessages;
  messageCourant!: Message;
  indexMessageCourant!: number;

  estConnecte:boolean = true;
  chargement:boolean = true;

  constructor(private serviceConnexion: ConnexionService) { }

  ngOnInit() {
    this.serviceConnexion.infosUtilisateur$.subscribe((infosUtilisateur) => {
      if (infosUtilisateur) {
        if(infosUtilisateur.peutEtreConnecte == true){
          if(infosUtilisateur.connecte == true){
            this.obtenirMessages(infosUtilisateur.utilisateur);
            this.estConnecte = true;
          } else {
            this.estConnecte = false;
          }
        } else {
          this.chargement = false;
          this.estConnecte = false;
        }
      } else {
        this.chargement = false;
        this.estConnecte = false;
      }
    });
  }

  obtenirMessages(utilisateur: string) {
    this.chargement = true;
    this.serviceConnexion.obtenirMessages().subscribe(
      {
        next: (response) => {
          this.chargement = false;
          this.lesMessages = response;
        },
        error: (error) => {
          this.chargement = false;
        }
      }
    )
  }

  changerMessageCourant(index: number) {
    this.messageCourant = this.lesMessages.data[index];
    this.indexMessageCourant = index;
  }


  calculerJours(envoi: string) {
    let dateCourante = new Date();
    let envoiP = new Date(envoi);
                                                                                                                                                                                                    // divisé par 1000 ms * 60 sec * 60 minutes * 24 heures
    return Math.floor((Date.UTC(dateCourante.getFullYear(), dateCourante.getMonth(), dateCourante.getDate()) - Date.UTC(envoiP.getFullYear(), envoiP.getMonth(), envoiP.getDate())) / (1000 * 60 * 60 * 24));
  }

  formatterDate(envoi:string){
    let envoiP = new Date(envoi);
    return "Le " + envoiP.getFullYear() + "-" + this.ajouterZeros(envoiP.getMonth() + 1) + "-" + this.ajouterZeros(envoiP.getDate()) + " à " + envoiP.getHours() + ":" + this.ajouterZeros(envoiP.getMinutes());
  }

  ajouterZeros(chiffre :number){
    if(chiffre >= 0 && chiffre <= 9){
      return "0" + chiffre;
    } else {
      return chiffre;
    }
  }

  copierMessage(){
    navigator.clipboard.writeText(this.messageCourant.message);
  }
}
