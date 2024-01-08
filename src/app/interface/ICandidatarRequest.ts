import { StatusCandidatoEnum } from "../enums/StatusCandidatoEnum";

export interface ICandidatarRequest{
  id: number,
  vagaId: number,
  perfilId: number,
  statusCandidato: StatusCandidatoEnum
}
