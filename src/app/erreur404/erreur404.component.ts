import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-erreur404',
  templateUrl: './erreur404.component.html',
  styleUrls: ['./erreur404.component.css']
})
export class Erreur404Component {
  nomComposante:string = "Erreur 404";
  /*
    Un jeu Flappy Bird avec l'element canvas
  */

  canvas: any;
  ctx: any;
  jeuCommence: boolean = false;
  enPause: boolean = false;
  perdu:boolean = false;
  score: number = 0;

  msNonClique:number = 0;

  intervalleJeu: any;
  intervalleVoler: any;

  listenerEspaceBind: any; 

  arrPlan: any;
  flappy1: any;
  flappy2: any;
  flappy3: any;
  flappyCourant: number = 1;
  flappyImageCourante: any;
  angleFlappy: number = 0;
  tuyeau: any;
  sol: any;

  posy: number = 250;
  posx: number = 288;

  tuyaux: Tuyaux[] = [];

  @ViewChild('canvasJeu', { static: true }) canvasJeu!: ElementRef;

  estCommence() {
    return this.jeuCommence;
  }

  commencer() {
    this.jeuCommence = true;
    this.enPause = false;
    this.perdu = false;
    this.posy = 250;
    this.score = 0;

    const canvas: HTMLCanvasElement = this.canvasJeu.nativeElement;
    const ctx = canvas.getContext('2d');

    this.canvas = canvas;
    this.ctx = ctx;

    this.arrPlan = new Image();
    this.arrPlan.src = '/assets/img/flappy/background-night.png';

    this.flappy1 = new Image();
    this.flappy1.src = '/assets/img/flappy/yellowbird-upflap.png';
    this.flappy2 = new Image();
    this.flappy2.src = '/assets/img/flappy/yellowbird-midflap.png';
    this.flappy3 = new Image();
    this.flappy3.src = '/assets/img/flappy/yellowbird-downflap.png';

    this.tuyeau = new Image();
    this.tuyeau.src = '/assets/img/flappy/tuyaux.png';

    this.sol = new Image();
    this.sol.src = '/assets/img/flappy/base.png';

    this.tuyaux = [];
    this.tuyaux.push({ posx: 300, posy: this.genererPosYTuyau() });
    this.tuyaux.push({ posx: 450, posy: this.genererPosYTuyau() });
    this.tuyaux.push({ posx: 600, posy: this.genererPosYTuyau() });

    this.listenerEspaceBind = this.voler.bind(this)

    this.partir();
  }

  perdre(){
    this.perdu = true;
    this.pause();
  }

  partir() {
    this.msNonClique = 0;
    this.enPause = false;
    this.intervalleJeu = setInterval(() => {
      this.rafraichirJeu();
    }, 10);

    this.intervalleVoler = setInterval(() => {
      this.volerFlappy();
    }, 100);
    this.canvas.addEventListener('click', this.listenerEspaceBind, true);
  }

  estPause() {
    return this.enPause;
  }

  estPerdu() {
    return this.perdu;
  }

  pause() {
    this.enPause = true;
    clearInterval(this.intervalleJeu);
    clearInterval(this.intervalleVoler);
    this.canvas.removeEventListener('click', this.listenerEspaceBind, true);
  }

  rafraichirJeu() {
    this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx!.drawImage(this.arrPlan, 0, 0);
    this.ctx!.drawImage(this.flappyImageCourante, 50, this.posy);
    if(this.msNonClique > 50){
      this.msNonClique = 50;
    }
    this.posy += this.posy * (this.msNonClique / 8000);
    this.posx -= 1;
    for (let i = 0; i < this.tuyaux.length; i++) {
      if(this.detecterCollision(this.tuyaux[i])){
        this.perdre();
      }
      this.ctx!.drawImage(this.tuyeau, this.tuyaux[i].posx, this.tuyaux[i].posy);
      this.tuyaux[i].posx--
      if (this.tuyaux[i].posx == 50) {
        this.score++;
      }
      if (this.tuyaux[i].posx < -52) {
        this.tuyaux.shift();
        i--;
        this.tuyaux.push({ posx: this.tuyaux[this.tuyaux.length - 1].posx + 150, posy: this.genererPosYTuyau() });
      }
    }
    this.ctx!.drawImage(this.sol, 0, 420);
    this.msNonClique++;
  }

  volerFlappy() {
    this.posy += 2;
    if (this.flappyCourant == 1) {
      this.flappyImageCourante = this.flappy1;
    } else if (this.flappyCourant == 2) {
      this.flappyImageCourante = this.flappy2;
    } else {
      this.flappyImageCourante = this.flappy3;
      this.flappyCourant = 0;
    }
    this.flappyCourant++;
  }

  voler(event: MouseEvent){
    
    for(let i = 0; i < 25; i++){
      window.setTimeout(() =>{
        this.posy -= 2
      }, 8 * i)
    }
    this.msNonClique = 0;
  }

  genererPosYTuyau(): number {
    return -(Math.random() * 200 + 50);
  }

  detecterCollision(tuyeau: Tuyaux): boolean{
    // Hauteur tuyeau: 306px
    // Espacement entre tuyeaux: 108px

    let flappy_haut = this.posy + 2;
    let flappy_gauche = 50;
    let flappy_bas = this.posy + 22;
    let flappy_droit = 50 + 30;

    let obstacleHaut_haut = tuyeau.posy;
    let obstacleHaut_gauche = tuyeau.posx;
    let obstacleHaut_bas = tuyeau.posy + 306;
    let obstacleHaut_droit = tuyeau.posx + 52;

    let obstacleBas_haut = tuyeau.posy + 306 + 108;
    let obstacleBas_gauche = tuyeau.posx;
    let obstacleBas_bas = tuyeau.posy + 306 + 108 + 306;
    let obstacleBas_droit = tuyeau.posx + 52;

    let condition = (flappy_gauche < obstacleHaut_droit &&  flappy_droit > obstacleHaut_gauche && flappy_haut < obstacleHaut_bas && flappy_bas > obstacleHaut_haut)
                    || (flappy_gauche < obstacleBas_droit &&  flappy_droit > obstacleBas_gauche && flappy_haut < obstacleBas_bas && flappy_bas > obstacleBas_haut)
                    || (flappy_haut < 0 || flappy_bas > 420)

    return condition;
  }
}


export interface Tuyaux {
  posx: number,
  posy: number
}  