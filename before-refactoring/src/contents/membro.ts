export class Membro {
    id: number;
    nome: string;
    tempo: string;
    presenca: boolean;
    passouTempoSugerido: boolean

    constructor(id: number, nome: string, tempo: string) {
        this.id = id;
        this.nome = nome;
        this.tempo = tempo;
        this.presenca = true;
        this.passouTempoSugerido = false;
    }
}