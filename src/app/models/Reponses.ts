
export interface ReponseSession {
    error: string,
    message: string,
    data: {
        "valid": boolean,
        "owner": string,
        "message": string
    };
}

export interface ReponseSessionReunion {
    error: number,
    valid: boolean,
    owner: string,
    message: string
}

export interface ReponseConnexion {
    error: string,
    message: string,
    data: string
}


export interface Erreur {
    erreur: string;
}

export interface TousMessages {
    error: string,
    data: [
        {
            userid: string,
            nom: string,
            prenom: string,
            email: string,
            telephone: string,
            message: string,
            create_date:string
        }
    ]
}

export interface Message {
    userid: string,
    nom: string,
    prenom: string,
    email: string,
    telephone: string,
    message: string,
    create_date: string
}

export interface InfoReunion {
    infos: Reunion[],
    heures: HeureReunion[],
    acceptations: Acceptation[],
    est_admin: boolean
}

export interface Reunion {
    id: number,
    titre: string,
    nom: string,
    description: string,
    lieu: string,
    couleur: number,
    date_limite: string
}

export interface HeureReunion {
    id: number,
    date: string,
    heure:string,
    duree: number
}

export interface Acceptation {
    id: number,
    id_heure: number,
    accepte: boolean,
    id_user: string
}


export interface EInfoReunion {
    info: EReunion,
    heures: EHeureReunion[]
}

export interface EReunion {
    titre: string,
    nom: string,
    description: string,
    lieu: string,
    couleur: number,
    date_limite: string,
    mdp: string,
    utilisateur: string
}

export interface EHeureReunion {
    date: string,
    heure: string,
    duree: string
}


export interface ParticipantsReunion {
    participants: Participant[],
    acceptations: Acceptation[]
}

export interface Participant {
    username: string,
    nom: string,
    est_admin: boolean
}

export interface InfoInvite {
    id: number,
    date_limite: string
    nom: string,
    titre: string,
    description: string,
    lieu: string,
    valide: boolean
}


export interface Invitation {
    date_limite: string,
    nom: string,
    id_reunion: string,
    id_lien:string
}
