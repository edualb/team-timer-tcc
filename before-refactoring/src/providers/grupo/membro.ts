import { Injectable } from '@angular/core';
import { Membro } from '../../contents/membro';

@Injectable()
export class MembroProvider {

    public deletaMembro(membro: Membro, array: Membro[]) {
        for (let i = 0 ; i < array.length ; i++) {
            if (array[i].id === membro.id && array[i].nome === membro.nome) {
                array.splice(i, 1);
            }
        }
    }

    public sortearMembros(membros: Membro[], membrosSorteados: Membro[]) {
        let membrosPresentes: Membro[] = [];
        
        this.getMembrosPresente(membros, membrosPresentes);

        let valorSorteado = Math.floor((Math.random() * membrosPresentes.length))

        membrosSorteados.push(membrosPresentes[valorSorteado]);

        for (let i = valorSorteado + 1 ; i < membrosPresentes.length ; i++) {
            membrosSorteados.push(membrosPresentes[i]);
        }

        for (let i = 0 ; i < valorSorteado ; i++) {
            membrosSorteados.push(membrosPresentes[i]);
        }
        
    }

    pularMembro(membrosSorteados: Membro[]) {
        let elemento = membrosSorteados[0];
        membrosSorteados.splice(0, 1);
        membrosSorteados.splice(membrosSorteados.length, 0, elemento);
    }

    private getMembrosPresente(membros: Membro[], membrosPresentes: Membro[]) {
        membros.forEach(element => {
            if (element.presenca === true) {
                membrosPresentes.push(element);
            }
        });
    }

    public getMembrosETempo(membros: Membro[]): string {
        let membrosComTempo = '-----MEMBERS-----';
        membros.forEach(element => {
            if (element.passouTempoSugerido) {
                membrosComTempo +='\n' + '*' + element.nome + '(' + element.tempo + ')' + '*';
            } else {
                membrosComTempo +='\n' + element.nome + '(' + element.tempo + ')';
            }
        });
        return membrosComTempo.toString();
    }

}