import { Membro } from "./membro";

export class Grupo {
    titulo: string;
    membros: Membro[];
    tempoLimite: string;

    constructor(titulo: string, membros: Membro[], tempoLimite: string) {
        this.titulo = titulo;
        this.membros = membros;
        this.tempoLimite = tempoLimite;
    }
}