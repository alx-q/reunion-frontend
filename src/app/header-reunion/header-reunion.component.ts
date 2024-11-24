import { Component } from '@angular/core';
import { ReunionService } from '../services/reunion.service';

@Component({
  selector: 'app-header-reunion',
  templateUrl: './header-reunion.component.html',
  styleUrls: ['./header-reunion.component.css']
})
export class HeaderReunionComponent {
  estConnecte:boolean = false;
  nomUtilisateur:string = "";

  constructor(private serviceReunion: ReunionService) {
    let token = localStorage.getItem("token_reunion");
    let utilisateur = localStorage.getItem("utilisateur_reunion");
    if(token != null){
      this.estConnecte = true;
      serviceReunion.verifierConnexion();
    } else {
      this.estConnecte = false;
    }
    if(utilisateur != null){
      this.nomUtilisateur = String(localStorage.getItem("utilisateur_reunion"));
    }
  }


  deconnecter(){
    this.serviceReunion.deconnecter();
    this.estConnecte = false;
  }
}
