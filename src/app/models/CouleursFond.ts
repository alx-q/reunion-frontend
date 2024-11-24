export interface CouleursFond{
    route:string
    couleur:string
    afficherHeader:boolean
}  

export const couleurs = [
    {
        route: "Message",
        couleur: "#11884b",
        afficherHeader: true
    },
    {
        route: "Documentation",
        couleur: "#dc3545",
        afficherHeader: true
    },
    {
        route: "Enregistrement",
        couleur: "#b37b0d",
        afficherHeader: true
    },
    {
        route: "Voir Invitation",
        couleur: "#009688",
        afficherHeader: false
    },
    {
        route: "Creer Enregistrement",
        couleur: "#b37b0d",
        afficherHeader: true
    },
    {
        route: "Reunion",
        couleur: "#30383f",
        afficherHeader: true
    },
    {
        route: "Creer Reunion",
        couleur: "#30383f",
        afficherHeader: true
    },
    {
        route: "Lecture Messages",
        couleur: "#0d51a5",
        afficherHeader: true
    }
]