import { IEndereco } from "./IEndereco"

export interface IPerfilCandidato{
    id:number,
    nome:string,
    celular:string,
    email:string,
    link:string,
    endereco: IEndereco,
    imagem:string
}
