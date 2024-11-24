import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.css']
})
export class AideComponent {
  @Output()
  fermerAide: EventEmitter<boolean> = new EventEmitter();

  @Input()
  changementComposante!: EventEmitter<string>;
  idPage: string = "accueil";
  titrePage: any = "accueil";

  ngOnInit(): void {
    this.changementComposante.subscribe((nomComposante:any) => {
      let titre = nomComposante//.substring(0, nomComposante.indexOf("Component"));
      //this.titrePage = titre;
      this.titrePage = titre;
      console.log(this.titrePage)
      //this.idPage = titre.toLowerCase();
    });
  }

  fermer() {
    this.fermerAide.emit(false);
  }

  defArticle(idPage: string): boolean {
    return this.titrePage == idPage;
  }
}
