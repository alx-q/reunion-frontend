import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {
  nomComposante:string = "Documentation";
  articleCourant:string = "accueil";

  estAffiche(article:string):boolean{
    return article == this.articleCourant;
  }

  naviguer(article:string){
    this.articleCourant = article;
  }
}
