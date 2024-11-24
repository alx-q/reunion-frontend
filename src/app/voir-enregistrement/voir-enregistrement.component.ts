import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { InfoInvite } from '../models/Reponses';
import { ReunionService } from '../services/reunion.service';

@Component({
  selector: 'app-voir-enregistrement',
  templateUrl: './voir-enregistrement.component.html',
  styleUrls: ['./voir-enregistrement.component.css']
})
export class VoirEnregistrementComponent {
  nomComposante:string = "Voir Invitation";
  id: string = "";
  enChargement: boolean = false;

  lesInfos!: InfoInvite;

  constructor(private serviceReunion: ReunionService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = params['id_invite'];
      this.enChargement = true;
      this.serviceReunion.obtenirDetailsInvite(this.id).subscribe(
        {
          next: (response) => {
            this.enChargement = false;
            this.lesInfos = response[0]
          },
          error: (error) => {
            this.enChargement = false;
          }
        });
    });
  }

  accepterInvitation(){
    this.enChargement = true;
    if(this.serviceReunion.estConnecte){
      this.serviceReunion.accepterInvite(this.id).subscribe(
        {
          next: (response) => {
            this.enChargement = false;
            this.router.navigate(['/reunion']);
          },
          error: (error) => {
            this.enChargement = false;
          }
        });
    } else {
      this.router.navigate(['/enregistrement', this.id]);
    }
  }
}
