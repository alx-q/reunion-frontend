import { Component, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { couleurs, CouleursFond } from './models/CouleursFond';
import { Router, NavigationEnd } from '@angular/router';
import { ConnexionService } from './services/connexion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Alexander';

  Utilisateur_nom: string = "INVITE";
  Utilisateur_Connecte: boolean = false;

  afficherHeader: boolean = true;
  couleur:string = "#0d6efd";
  couleursFond:CouleursFond[] = couleurs;

  changementAideEmitter = new EventEmitter<string>(); 
  
  aideActif: boolean = false;
  nomComposante: string = "accueil";

  afficherScrollToTop:boolean = false;

  constructor(private router: Router, public serviceConnexion: ConnexionService) { }

  changementNomComposante(event:any){
    this.nomComposante = event.nomComposante;
    this.changementAideEmitter.emit(this.nomComposante);
    let nouvelleCouleur = this.couleursFond.find(page => page.route == this.nomComposante)
    if(nouvelleCouleur != null){
      this.couleur = nouvelleCouleur.couleur;
      this.afficherHeader = nouvelleCouleur.afficherHeader;
    } else {
      this.couleur = "#0d6efd";
      this.afficherHeader = true;
    }
  }

  aideEstActif():boolean{
    if(this.aideActif == true){
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    if(!localStorage.getItem("afficherAide")){
      localStorage.setItem("afficherAide", this.aideActif.toString());
    } else {
      let afficherAide = localStorage.getItem("afficherAide");
      if(afficherAide == "true"){
        this.aideActif = true;
      } else if (afficherAide == "false"){
        this.aideActif = false;
      } else {
        localStorage.setItem("afficherAide", "false");
      }
    }
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.serviceConnexion.verifierConnexion();
        }
      });
    
  }

  gererAide(afficher: boolean){
    this.aideActif = afficher;
    localStorage.setItem("afficherAide", this.aideActif.toString());
  }

  changerAide(){
    this.gererAide(!this.aideActif);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.afficherScrollToTop = (window.pageYOffset > 150);
  }

  defilerEnHaut(){
    window.scroll(0,0);
  }
}
