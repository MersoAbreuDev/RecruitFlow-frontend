import { IEndereco } from "./IEndereco"

export interface IPerfilCandidato{
    nome:string,
    celular:string,
    email:string,
    link:string,
    endereco: IEndereco,
    imagem:string
}