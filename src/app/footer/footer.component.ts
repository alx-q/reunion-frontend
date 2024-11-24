import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  listeLocales = [
    {
      code: 'fr-CA',
      nom: 'Français'
    },
    {
      code: 'en-CA',
      nom: 'English'
    },
    {
      code: 'ro-RO',
      nom: 'Română'
    }
  ]
}
