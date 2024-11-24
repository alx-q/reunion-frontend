import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { InfoReunion, Reunion, HeureReunion, EReunion, EInfoReunion, ParticipantsReunion, ReponseSession, ReponseSessionReunion, InfoInvite, Invitation } from '../models/Reponses';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  constructor(private http: HttpClient, private router: Router) {
    let token = localStorage.getItem("token_reunion");
    let utilisateur = localStorage.getItem("utilisateur_reunion");
    if(token != null){
      this.token = String(localStorage.getItem("token_reunion"));
      this.estConnecte = true;
    } else {
      this.estConnecte = false;
    }
    if(utilisateur != null){
      this.nomUtilisateur = String(localStorage.getItem("utilisateur_reunion"));
    }
  }

  serveur = "https://reunion-backend-kappa.vercel.app";

  nomUtilisateur:string = "alex";
  estConnecte: boolean = false;
  token:string = "";

  creerUtilisateur(username:string, email:string, nom:string, password:string){
    let url = this.serveur + "/create_user/";
    let body = {
      username: username,
      password: password,
      email: email,
      nom: nom,
      key: "alexcreation"
    };
    return this.http.post(url, body);
  }

  seConnecter(username: string, password: string){
    let url = this.serveur + "/session/";
    let body = {
      username: username,
      password: password
    };
    return this.http.post(url, body);
  }

  deconnecter(){
    this.estConnecte = false;
    this.nomUtilisateur = "";
    localStorage.removeItem("token_reunion");
    localStorage.removeItem("utilisateur_reunion");
    this.router.navigate(['/enregistrement']);
  }

  verifierConnexion(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let url = this.serveur + "/secret";
    let body = { headers: headers };

    this.http.get<ReponseSessionReunion>(url, body).subscribe(
      {
        next: (response) => {
          if (!response.error) {
            if (response.valid == true) {
              this.nomUtilisateur = response.owner;
              this.estConnecte = true;
              localStorage.setItem("utilisateur_reunion", this.nomUtilisateur);
            } else {
              localStorage.removeItem("token_reunion");
              localStorage.removeItem("utilisateur_reunion");
              this.token = "";
              this.estConnecte = false;
            }
          }
        },
        error: (error) => {
        }
      }
    )
  }


  creerReunion(infos: EInfoReunion) {
    let url = this.serveur + "/reunion/?type=ajouterReunion";
    let body = infos;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let options = { headers: headers };
    return this.http.post(url, body, options);
  }

  obtenirReunions(){
    let url = this.serveur + "/reunion/?type=voirReunions";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let body = { headers: headers };
    return this.http.get<Reunion[]>(url, body);
  }

  obtenirInfoReunion(id_reunion:number){
    let url = this.serveur + "/reunion/?type=voirReunion&id_reunion=" + id_reunion;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let body = { headers: headers };
    return this.http.get<InfoReunion>(url, body);
  }

  obtenirParticipants(id_reunion:number){
    let url = this.serveur + "/reunion/?type=voirParticipants&id_reunion=" + id_reunion;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let body = { headers: headers };
    return this.http.get<ParticipantsReunion>(url, body);
  }

  confirmerHeure(id_heure: number){
    let url = this.serveur + "/reunion/?type=accepterHeure";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let options = { headers: headers };
    let body = {
      id_heure: id_heure
    };
    return this.http.post(url, body, options);
  }

  modifierHeures(id_reunion:number, heures:HeureReunion[]){
    let url = this.serveur + "/reunion/?type=modifierHeures";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let options = { headers: headers };
    let body = {
      id_reunion: id_reunion,
      heures: heures,
    };
    return this.http.post(url, body, options);
  }

  changerDetails(infos: Reunion){
    let url = this.serveur + "/reunion/?type=modifierDetails";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let options = { headers: headers };
    let body = {
      infos: infos
    };
    return this.http.post(url, body, options);
  }

  obtenirDetailsInvite(id_invite: string){
    let url = this.serveur + "/reunion/?type=voirInvite&id_invite=" + id_invite;
    return this.http.get<InfoInvite[]>(url);
  }

  ajouterOuEnleverAdmin(username: string, id_reunion:number, est_admin:boolean){
    let url = this.serveur + "/reunion/?type=ajouterAdmin";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let options = { headers: headers };
    let body = {
      username: username,
      id_reunion: id_reunion,
      est_admin:est_admin
    };
    return this.http.post(url, body, options);
  }

  supprimerMembre(id_reunion:number, username: string){
    let url = this.serveur + "/reunion/?type=supprimerMembre&id_reunion=" + id_reunion + "&username=" + username;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let options = { headers: headers };
    return this.http.delete(url, options);
  }

  supprimerReunion(id_reunion:number){
    let url = this.serveur + "/reunion/?type=supprimerReunion&id_reunion=" + id_reunion;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let options = { headers: headers };
    return this.http.delete(url, options);
  }

  accepterInvite(id_invite: string){
    let url = this.serveur + "/reunion/?type=accepterInvite";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let options = { headers: headers };
    let body = {
      invite: id_invite
    };
    return this.http.post(url, body, options);
  }

  obtenirInvites(id_reunion: number){
    let url = this.serveur + "/reunion/?type=voirInvites&id_reunion=" + id_reunion;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let body = {
      headers: headers
    };
    return this.http.get<Invitation[]>(url, body);
  }

  creerInvite(id_reunion:number, date_limite:string, nom:string){
    let url = this.serveur + "/reunion/?type=ajouterInvite";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let options = { headers: headers };
    let body = {
      id_reunion: id_reunion,
      date_limite: date_limite,
      nom: nom
    };
    return this.http.post(url, body, options);
  }

  supprimerInvite(id_reunion:number, id_lien:string){
    let url = this.serveur + "/reunion/?type=supprimerInvite&id_reunion=" + id_reunion + "&id_lien=" + id_lien;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    let options = { headers: headers };
    return this.http.delete(url, options);
  }
}
