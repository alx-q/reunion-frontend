import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input()
  title!:string;

  @Input()
  couleur:string | undefined;

  @Output()
  changerAide: EventEmitter<void> = new EventEmitter();

  constructor(public serviceConnexion: ConnexionService) {
    this.serviceConnexion.infosUtilisateur$.subscribe((infosUtilisateur) => {
      if(infosUtilisateur){
        this.estConnecte = infosUtilisateur.connecte;
        this.nomUtilisateur = infosUtilisateur.utilisateur;
      }
    });
  }

  
  estConnecte:boolean = this.serviceConnexion.estConnecte;
  nomUtilisateur:string = "";

  changerEtatAide(){
    this.changerAide.emit();
  }

  deconnecter(){
    this.estConnecte = false;
    this.serviceConnexion.deconnecter();
  }
}
