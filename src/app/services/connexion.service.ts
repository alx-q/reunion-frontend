import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReponseSession, ReponseConnexion, Erreur, TousMessages } from '../models/Reponses';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  serveur = "http://cegep.fdtt.space/v1";

  constructor(
    private http: HttpClient
  ) {
    this.verifierConnexion();
  }

  // Infos utilisateur et permettre l'observable
  private infosUtilisateur = new BehaviorSubject<any>({
    peutEtreConnecte:true,
    connecte: false,
    utilisateur: "",
    token: "",
  });
  public infosUtilisateur$ = this.infosUtilisateur.asObservable();

  estConnecte:boolean = false;
  tokenUtilisateur: string = "";
  nomUtilisateur: string = "";

  // Envoyer messages
  transmettreMessage(nom: string, prenom: string, courriel: string, message: string) {
    let url = this.serveur + "/contact/alex";
    let body = {
      nom: nom,
      prenom: prenom,
      email: courriel,
      telephone: "000",
      message: message
    };
    return this.http.put(url, body);
  }

  // Obtenir un token
  connecter(utilisateur: string, motDePasse: string) {
    let url = this.serveur + "/session";
    let body = {
      username: utilisateur,
      password: motDePasse
    };
    return this.http.post<ReponseConnexion>(url, body);
  }

  // Verifier validite du token
  verifierToken(token: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    let url = this.serveur + "/secret";
    let body = { headers: headers };
    this.http.get<ReponseSession>(url, body).subscribe(
      {
        next: (response) => {
          if (!response.error) {
            if (response.data.valid == true) {
              this.tokenUtilisateur = token;
              this.nomUtilisateur = response.data.owner;
              this.estConnecte = true;
              localStorage.setItem("connexion", token);

              let objetUtilisateur:IinfosUtilisateur = {
                peutEtreConnecte:true,
                connecte: true,
                utilisateur: response.data.owner,
                token: token
              } 

              this.infosUtilisateur.next(objetUtilisateur);
            } else {
              localStorage.removeItem("connexion");
              this.tokenUtilisateur = "";
              this.estConnecte = false;
            }
          }
        },
        error: (error) => {
          localStorage.removeItem("connexion");
          this.tokenUtilisateur = "";
          this.estConnecte = false;

          this.infosUtilisateur.next({
            peutEtreConnecte:false,
            connecte: false,
            utilisateur: "",
            token: ""
          })
        }
      }
    )
  }

  // Voir si on est connecte
  verifierConnexion(){
    let itemConnexion = localStorage.getItem("connexion");
    if (itemConnexion != null) {
      this.verifierToken(itemConnexion);
    } else {
      this.estConnecte = false;
      this.infosUtilisateur.next({
        peutEtreConnecte:false,
        connecte: false,
        utilisateur: "",
        token: ""
      })
    }
  }

  getStatutConnexion(){
    return this.infosUtilisateur.getValue().connecte;
  }
  getNomUtilisateur(){
    return this.infosUtilisateur.getValue().utilisateur;
  }
  getTokenUtilisateur(){
    return this.infosUtilisateur.getValue().token;
  }

  obtenirMessages(){
    let url = this.serveur + "/contact/" + this.getNomUtilisateur();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.tokenUtilisateur}`
    });
    let body = { headers: headers }
    return this.http.get<TousMessages>(url, body)
  }

  deconnecter(){
    localStorage.removeItem("connexion");
    this.verifierConnexion();
  }
}


interface IinfosUtilisateur {
  peutEtreConnecte:boolean,
  connecte: boolean,
  utilisateur:string,
  token:string
}