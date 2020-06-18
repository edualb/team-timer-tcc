import { Grupo } from "./Grupo";

export class GrupoList {
    key: string;
    grupo: Grupo;

    constructor(key: string, grupo: Grupo) {
        this.key = key;
        this.grupo = grupo;
    }
}