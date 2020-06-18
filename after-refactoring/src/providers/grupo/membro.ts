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
}