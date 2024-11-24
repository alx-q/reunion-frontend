import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil-component',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  nomComposante:string = "accueil";
  langages: Langages[] = lanagages;
}


export interface Langages{
  image:string,
  nom:string
}

export const lanagages = [
  {
    image: "html.png",
    nom: "HTML"
  },
  {
    image: "css.png",
    nom: "CSS"
  },
  {
    image: "js.png",
    nom: "JS"
  },
  {
    image: "php.png",
    nom: "PHP"
  },
  {
    image: "bootstrap.png",
    nom: "Bootstrap"
  },
  {
    image: "java.png",
    nom: "Java"
  },
  {
    image: "algobox.png",
    nom: "AlgoBox"
  },
  {
    image: "ts.png",
    nom: "TypeScript"
  },
  {
    image: "angular.png",
    nom: "Angular"
  }
]